const commonjs = require("@rollup/plugin-commonjs");
const typescript = require("@rollup/plugin-typescript");
const terser = require("@rollup/plugin-terser");
const scss = require("rollup-plugin-scss");
const copy = require("rollup-plugin-copy");
const { default: preserveDirectives } = require("rollup-preserve-directives");

module.exports = {
    input: ["src/index.tsx", "src/assets/index.ts"],
    output: [
        {
            dir: "lib",
            format: "es",
            sourcemap: true,
            preserveModules: true,
            assetFileNames: "[name][extname]",
        },
    ],
    external: [
        "react",
        "react/jsx-runtime",
        "react-dom",
        "next/link",
        "next/server",
        "next/navigation",
        "clsx",
        "socket.io-client",
        "fs",
        "fs/promises",
        "path",
    ],
    plugins: [
        commonjs(),
        typescript({ tsconfig: "./tsconfig.json" }),
        terser(),
        preserveDirectives(),
        scss({
            outputStyle: "compressed",
            output: true,
            failOnError: true,
            fileName: "styles.css",
            sourceMap: true,
            exclude: ["node_modules/"],
        }),
        copy({
            targets: [{ src: "src/assets/themes/*", dest: "lib/assets/themes" }],
        }),
    ],
};
