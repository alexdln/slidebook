const { formatSlides: formatSlidesTs } = require("./src/lib/format-slides.ts");
const { execSync } = require("child_process");

formatSlidesTs();

console.log("Compiling slides...");

try {
    execSync("next build");
    console.log("Build finished. Run `npm start` to present in live mode");
} catch (error) {
    console.error((error as unknown as Error).toString());
}
