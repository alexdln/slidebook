import { execSync } from "child_process";

import { formatFiles, cleanSlides } from "./format-files.js";

const build = async () => {
    await cleanSlides();
    await formatFiles();

    console.log("Compiling slides...");

    try {
        execSync(`next build`, { shell: true, stdio: "inherit", cwd: IMAGE_DIR });
        console.log("Build finished. Run `npm start` to present in live mode");
    } catch (error) {
        console.error("Error running next build", error.toString());
    }
};

build();
