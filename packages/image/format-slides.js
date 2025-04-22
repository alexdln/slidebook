import { existsSync, mkdirSync } from "fs";
import fs from "fs/promises";
import path from "path";

export const getDirs = (soft = false) => {
    let sourceDir = path.join(process.cwd(), "slides");
    if (!existsSync(sourceDir)) {
        sourceDir = path.join(process.cwd(), "src", "slides");
    }

    if (!existsSync(sourceDir) && !soft) {
        throw new Error("Slides directory not found");
    }

    const outputDir = path.join(process.cwd(), "build", ".tmp", "src", "app", "[[...pathname]]", "slides");
    if (!existsSync(outputDir)) {
        mkdirSync(outputDir, { recursive: true });
    }

    return { sourceDir, outputDir };
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

export const formatSlides = async () => {
    const { sourceDir, outputDir } = getDirs();
    const files = await fs.readdir(sourceDir);

    const slides = [];
    for await (const filename of files) {
        if (filename.match(/^(slide-)?\d+\.(tsx|jsx)$/)) {
            const { import: importString, exports, index } = await formatSlide(filename);
            slides.push({ import: importString, exports, index });
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

export const cleanSlides = async () => {
    const { outputDir } = getDirs(true);
    await fs.rm(outputDir, { recursive: true, force: true });
    await fs.mkdir(outputDir, { recursive: true });
    await fs.copyFile(path.join(outputDir, "../_slides.ts"), path.join(outputDir, "index.ts"));
};
