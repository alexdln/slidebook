import { formatFiles, cleanSlides } from "@slidebook/core/lib/lib/format-files.js";
import { execSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const build = async () => {
    await cleanSlides();
    await formatFiles();

    console.log("Compiling slides...");

    try {
        execSync(`next build`, { shell: true, stdio: "inherit", cwd: __dirname });
        console.log("Build finished. Run `npm start` to present in live mode");
    } catch (error) {
        console.error("Error running next build", error.toString());
    }
};

build();
