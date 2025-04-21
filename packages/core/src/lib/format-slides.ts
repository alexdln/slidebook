import { existsSync, mkdirSync } from "fs";
import fs from "fs/promises";
import path from "path";

const sourceDir = path.join(process.env.ORIG_CWD || process.cwd(), "src", "slides");
const outputDir = path.join(process.env.IMAGE_CWD || process.cwd(), "src", "app", "[[...pathname]]", "slides");

export const formatSlide = async (slide: string) => {
    if (!existsSync(sourceDir)) {
        throw new Error("Slides directory not found");
    }

    if (!existsSync(outputDir)) {
        mkdirSync(outputDir, { recursive: true });
    }

    const slideContent = await fs.readFile(path.join(sourceDir, slide), "utf-8");
    const validSlideExport = slideContent.match(/^export const Slide = .*$/m);
    const validNotesExport = slideContent.match(/^export const Notes = .*$/m);

    if (!validSlideExport) {
        throw new Error(`Invalid slide: ${slide}. Please export a component called "Slide"`);
    }

    const slideIndex = slide.replace(".tsx", "");
    const slidePath = path.join(outputDir, `${slideIndex}.tsx`);

    await fs.writeFile(slidePath, slideContent);

    if (validNotesExport) {
        return {
            import: `import { Slide as Slide${slideIndex}, Notes as Notes${slideIndex} } from "./${slide}";`,
            name: { index: slideIndex, name: `Slide${slideIndex}`, notes: `Notes${slideIndex}` },
        };
    } else {
        return {
            import: `import { Slide as Slide${slideIndex} } from "./${slide}";`,
            name: { index: slideIndex, name: `Slide${slideIndex}` },
        };
    }
};

export const formatSlides = async () => {
    if (!existsSync(sourceDir)) {
        throw new Error("Slides directory not found");
    }

    if (!existsSync(outputDir)) {
        mkdirSync(outputDir, { recursive: true });
    }

    const slides = await fs.readdir(sourceDir);

    const imports = [];
    const slideNames = [];
    for await (const slide of slides) {
        const { import: importString, name } = await formatSlide(slide);
        imports.push(importString);
        slideNames.push(name);
    }

    if (slideNames.length === 0) {
        throw new Error("No slides found");
    }

    imports.push(
        "export const slides = [",
        ...slideNames
            .sort((a, b) => +a.index - +b.index)
            .map((slide) =>
                slide.notes
                    ? `\t{ component: ${slide.name}, notes: ${slide.notes} },`
                    : `\t{ component: ${slide.name} },`,
            ),
        "];",
    );

    await fs.writeFile(path.join(outputDir, "index.ts"), imports.join("\n"));
};

export const cleanSlides = async () => {
    await fs.rm(outputDir, { recursive: true, force: true });
    await fs.mkdir(outputDir, { recursive: true });
    await fs.copyFile(path.join(outputDir, "../_slides.ts"), path.join(outputDir, "index.ts"));
};
