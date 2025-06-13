// @ts-check

import { existsSync, mkdirSync } from "fs";
import fs from "fs/promises";
import path from "path";

import { IMAGE_DIR, OUT_DIR, IS_LIMITED_CI, IS_EJECTED } from "./constants.js";

/**
 * Returns various relevant input and output directories for slides and assets.
 * @param {boolean} [soft=false] - If true, suppresses error when slides directory doesn't exist.
 * @returns {{
 *   sourceDir: string,
 *   sourceSlidesDir: string,
 *   outputSlidesDir: string,
 *   sourceAssetsDir: string,
 *   outputAssetsDir: string,
 *   outputDir: string
 * }}
 */
export const getDirs = (soft = false) => {
    let sourceSlidesDir = path.join(process.cwd(), "slides");
    let sourceAssetsDir = path.join(process.cwd(), "assets");
    if (!existsSync(sourceSlidesDir)) {
        sourceSlidesDir = path.join(process.cwd(), "src", "slides");
    }

    if (!existsSync(sourceSlidesDir) && !soft) {
        throw new Error("Slides directory not found");
    }

    const appOutputDir = path.join(OUT_DIR, "src", "app");
    const outputSlidesDir = path.join(appOutputDir, "slides");
    if (!existsSync(outputSlidesDir)) {
        mkdirSync(outputSlidesDir, { recursive: true });
    }

    return {
        sourceDir: process.cwd(),
        sourceSlidesDir,
        outputSlidesDir,
        sourceAssetsDir,
        outputAssetsDir: path.join(OUT_DIR, "public"),
        outputDir: OUT_DIR,
    };
};

/**
 * Processes a slide file and returns import/export metadata.
 * @param {string} slide - Slide filename.
 * @param {string} sourceSlidesDir - Source slides directory.
 * @returns {Promise<{ import: string, exports: { name: string, notes?: string }, index: string }>}
 */
export const formatSlide = async (slide, sourceSlidesDir) => {
    const index = slide.match(/^(slide-)?(\d+)\.(tsx|jsx)$/)?.[2];
    if (!index) {
        throw new Error(
            `Invalid slide: ${slide}. Please use the format "slide-<index>.{tsx|jsx}" or "<index>.{tsx|jsx}"`,
        );
    }

    const slideContent = await fs.readFile(path.join(sourceSlidesDir, slide), "utf-8");
    const validSlideExport = slideContent.match(/^export const Slide = .*$/m);
    const validNotesExport = slideContent.match(/^export const Notes = .*$/m);

    if (!validSlideExport) {
        throw new Error(`Invalid slide: ${slide}. Please export a component called "Slide"`);
    }

    if (validNotesExport) {
        return {
            import: `import { Slide as Slide${index}, Notes as Notes${index} } from "./${slide}";`,
            exports: { name: `Slide${index}`, notes: `Notes${index}` },
            index,
        };
    } else {
        return {
            import: `import { Slide as Slide${index} } from "./${slide}";`,
            exports: { name: `Slide${index}` },
            index,
        };
    }
};

/**
 * Copies and validates a segment file such as "layer.tsx".
 * @param {string} segment - Segment filename.
 * @returns {Promise<void>}
 */
export const formatSegment = async (segment) => {
    const { sourceSlidesDir } = getDirs();

    const segmentContent = await fs.readFile(path.join(sourceSlidesDir, segment), "utf-8");
    if (segment.match(/^layer\.(tsx|jsx)$/)) {
        const validLayoutExport = segmentContent.match(/^export const Layer = .*$/m);
        if (!validLayoutExport) {
            throw new Error(`Invalid segment: ${segment}. Please export a component called "Layer"`);
        }
    }
};

/**
 * Processes a single file and returns its type and metadata.
 * @param {string} filename - Filename to format.
 * @param {"slides"|"asset"} type - Type of file.
 * @param {ReturnType<typeof getDirs>} dirs - Directory configuration.
 * @returns {Promise<{ type: string, data: any }>}
 */
export const formatFile = async (filename, type, dirs) => {
    if (filename.match(/^(slide-)?\d+\.(tsx|jsx)$/)) {
        const data = await formatSlide(filename, dirs.sourceSlidesDir);
        await fs.cp(path.join(dirs.sourceSlidesDir, filename), path.join(dirs.outputSlidesDir, filename));
        return { type: "slide", data };
    }

    if (filename.match(/^layer\.(tsx|jsx)$/)) {
        await formatSegment(filename);
        await fs.cp(path.join(dirs.sourceSlidesDir, filename), path.join(dirs.outputSlidesDir, filename));
        return { type: "segment", data: filename };
    }

    if (["favicon.ico"].includes(filename)) {
        await fs.cp(path.join(dirs.sourceSlidesDir, filename), path.join(dirs.outputDir, "src/app", filename));
        return { type: "root-file", data: filename };
    }

    if (type === "asset") {
        await fs.cp(path.join(dirs.sourceAssetsDir, filename), path.join(dirs.outputAssetsDir, filename));
        return { type: "asset", data: filename };
    }

    return { type: "unknown", data: filename };
};

/**
 * Processes all slide and asset files, and writes the combined index file.
 * @returns {Promise<void>}
 */
export const formatFiles = async () => {
    const dirs = getDirs();
    const { sourceSlidesDir, sourceAssetsDir, outputSlidesDir } = dirs;
    const filenames = await fs.readdir(sourceSlidesDir);
    const assets = existsSync(sourceAssetsDir) ? await fs.readdir(sourceAssetsDir, { recursive: true }) : [];

    const slides = [];
    const segments = [];
    for await (const filename of filenames) {
        const { type, data } = await formatFile(filename, "slides", dirs);
        if (type === "slide") {
            slides.push(data);
        } else {
            segments.push(data);
        }
    }

    for await (const asset of assets) {
        await formatFile(asset, "asset", dirs);
    }

    if (slides.length === 0) {
        throw new Error("No slides found");
    }

    slides.sort((a, b) => +a.index - +b.index);
    const imports = slides.map((slide) => slide.import);
    const list = slides.map((slide) =>
        slide.exports.notes
            ? `\t{ component: ${slide.exports.name}, notes: ${slide.exports.notes} },`
            : `\t{ component: ${slide.exports.name} },`,
    );
    const content = `${imports.join("\n")}\nexport const slides = [\n${list.join("\n")}\n];`;
    await fs.writeFile(path.join(outputSlidesDir, "index.ts"), content);
};

/**
 * Cleans the output directory by removing generated and cached files.
 * @returns {Promise<void>}
 */
export const cleanOutDir = async () => {
    const { outputSlidesDir } = getDirs(true);
    const rmQueue = [fs.rm(path.join(IMAGE_DIR, "node_modules", ".bin"), { recursive: true, force: true })];
    if (IS_LIMITED_CI) {
        rmQueue.push(
            fs.rm(path.join(IMAGE_DIR, "node_modules", "next"), { recursive: true, force: true }),
            fs.rm(path.join(IMAGE_DIR, "node_modules", "react"), { recursive: true, force: true }),
            fs.rm(path.join(IMAGE_DIR, "node_modules", "react-dom"), { recursive: true, force: true }),
        );
    }

    await Promise.all([
        ...rmQueue,
        fs.rm(path.join(outputSlidesDir, "src"), { recursive: true, force: true }),
        fs.rm(path.join(outputSlidesDir, "node_modules"), { recursive: true, force: true }),
        fs.rm(path.join(outputSlidesDir, "next-env.d.ts"), { recursive: true, force: true }),
        fs.rm(path.join(outputSlidesDir, "next.config.ts"), { recursive: true, force: true }),
        fs.rm(path.join(outputSlidesDir, "package.json"), { recursive: true, force: true }),
        fs.rm(path.join(outputSlidesDir, "tsconfig.json"), { recursive: true, force: true }),
    ]);
    await fs.mkdir(outputSlidesDir, { recursive: true });
};

/**
 * Ejects the build by copying necessary files and removing templates.
 * @returns {Promise<void>}
 */
export const eject = async () => {
    if (IS_EJECTED) {
        throw new Error("Already ejected");
    }

    const copyQueue = [
        fs.cp(path.join(IMAGE_DIR, "src"), path.join(OUT_DIR, "src"), { recursive: true }),
        fs.cp(path.join(IMAGE_DIR, "next-env.d.ts"), path.join(OUT_DIR, "next-env.d.ts"), { recursive: true }),
        fs.cp(path.join(IMAGE_DIR, "next.config.ts"), path.join(OUT_DIR, "next.config.ts"), { recursive: true }),
    ];
    if (!existsSync(path.join(OUT_DIR, "tsconfig.json"))) {
        copyQueue.push(
            fs.cp(path.join(IMAGE_DIR, "tsconfig.json"), path.join(OUT_DIR, "tsconfig.json"), { recursive: true }),
        );
    }

    await Promise.all(copyQueue);
    await formatFiles();
    const packageJsonRaw = await fs.readFile(path.join(OUT_DIR, "package.json"), "utf-8");
    const packageJson = JSON.parse(packageJsonRaw);
    delete packageJson.scripts.eject;
    await Promise.all([
        fs.writeFile(path.join(OUT_DIR, "package.json"), JSON.stringify(packageJson, null, 2)),
        fs.rm(path.join(OUT_DIR, "slides"), { recursive: true, force: true }),
        fs.rm(path.join(OUT_DIR, "src", "slides"), { recursive: true, force: true }),
    ]);
};
