import { existsSync, mkdirSync } from "fs";
import fs from "fs/promises";
import path from "path";

import { IMAGE_DIR, OUT_DIR } from "./constants.js";

export const getDirs = (soft = false) => {
    let sourceDir = path.join(process.cwd(), "slides");
    if (!existsSync(sourceDir)) {
        sourceDir = path.join(process.cwd(), "src", "slides");
    }

    if (!existsSync(sourceDir) && !soft) {
        throw new Error("Slides directory not found");
    }

    const appOutputDir = path.join(OUT_DIR, "src", "app");
    const outputDir = path.join(appOutputDir, "slides");
    if (!existsSync(outputDir)) {
        mkdirSync(outputDir, { recursive: true });
    }

    return { sourceDir, outputDir, appOutputDir };
};

export const formatSlide = async (slide) => {
    const index = slide.match(/^(slide-)?(\d+)\.(tsx|jsx)$/)?.[2];
    if (!index) {
        throw new Error(
            `Invalid slide: ${slide}. Please use the format "slide-<index>.{tsx|jsx}" or "<index>.{tsx|jsx}"`,
        );
    }

    const { sourceDir, outputDir } = getDirs();

    const slideContent = await fs.readFile(path.join(sourceDir, slide), "utf-8");
    const validSlideExport = slideContent.match(/^export const Slide = .*$/m);
    const validNotesExport = slideContent.match(/^export const Notes = .*$/m);

    if (!validSlideExport) {
        throw new Error(`Invalid slide: ${slide}. Please export a component called "Slide"`);
    }

    const slidePath = path.join(outputDir, slide);
    await fs.writeFile(slidePath, slideContent);

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

export const formatSegment = async (segment) => {
    const { sourceDir, outputDir } = getDirs();

    const segmentContent = await fs.readFile(path.join(sourceDir, segment), "utf-8");
    if (segment.match(/^layer\.(tsx|jsx)$/)) {
        const validLayoutExport = segmentContent.match(/^export const Layer = .*$/m);
        if (!validLayoutExport) {
            throw new Error(`Invalid segment: ${segment}. Please export a component called "Layer"`);
        }
    }

    const segmentPath = path.join(outputDir, segment);
    await fs.writeFile(segmentPath, segmentContent);
};

export const formatRootFile = async (filename) => {
    const { sourceDir, appOutputDir } = getDirs();

    if (["favicon.ico"].includes(filename)) {
        await fs.cp(path.join(sourceDir, filename), path.join(appOutputDir, filename));
    }
};

export const formatFile = async (filename) => {
    if (filename.match(/^(slide-)?\d+\.(tsx|jsx)$/)) {
        const data = await formatSlide(filename);
        return { type: "slide", data };
    }

    if (filename.match(/^layer\.(tsx|jsx)$/)) {
        await formatSegment(filename);
        return { type: "segment", data: filename };
    }

    if (["favicon.ico"].includes(filename)) {
        await formatRootFile(filename);
        return { type: "root-file", data: filename };
    }

    return { type: "unknown", data: filename };
};

export const formatFiles = async () => {
    const { sourceDir, outputDir } = getDirs();
    const filenames = await fs.readdir(sourceDir);

    const slides = [];
    const segments = [];
    for await (const filename of filenames) {
        const { type, data } = await formatFile(filename);
        if (type === "slide") {
            slides.push(data);
        } else {
            segments.push(data);
        }
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
    await fs.writeFile(path.join(outputDir, "index.ts"), content);
};

export const cleanOutDir = async () => {
    const { outputDir } = getDirs(true);
    await Promise.all([
        fs.rm(path.join(outputDir, "lib"), { recursive: true, force: true }),
        fs.rm(path.join(outputDir, "src"), { recursive: true, force: true }),
        fs.rm(path.join(IMAGE_DIR, "node_modules", ".bin"), { recursive: true, force: true }),
        fs.rm(path.join(IMAGE_DIR, "node_modules", "next"), { recursive: true, force: true }),
        fs.rm(path.join(IMAGE_DIR, "node_modules", "react"), { recursive: true, force: true }),
        fs.rm(path.join(IMAGE_DIR, "node_modules", "react-dom"), { recursive: true, force: true }),
        fs.rm(path.join(outputDir, "node_modules"), { recursive: true, force: true }),
        fs.rm(path.join(outputDir, "next-env.d.ts"), { recursive: true, force: true }),
        fs.rm(path.join(outputDir, "next.config.ts"), { recursive: true, force: true }),
        fs.rm(path.join(outputDir, "package.json"), { recursive: true, force: true }),
        fs.rm(path.join(outputDir, "slidebook.js"), { recursive: true, force: true }),
        fs.rm(path.join(outputDir, "tsconfig.json"), { recursive: true, force: true }),
    ]);
    await fs.mkdir(outputDir, { recursive: true });
};

export const cleanSlides = async () => {
    const { outputDir } = getDirs(true);
    await cleanOutDir();
    await fs.copyFile(path.join(outputDir, "../_slides.ts"), path.join(outputDir, "index.ts"));
};
