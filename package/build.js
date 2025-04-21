import { formatSlides } from "./src/lib/format-slides.js";
import { spawnSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

formatSlides();

console.log("Compiling slides...");

try {
    spawnSync("next", ["build"], { shell: true, stdio: "inherit", cwd: __dirname });
    console.log("Build finished. Run `npm start` to present in live mode");
} catch (error) {
    console.error(error.toString());
}
