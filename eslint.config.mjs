import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import tseslint from "typescript-eslint";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    {
        rules: {
            "prettier/prettier": [
                "error",
                {
                    endOfLine: "auto",
                    tabWidth: 4,
                    printWidth: 120,
                    arrowParens: "always",
                },
            ],
        },
    },
    ...tseslint.configs.recommended,
    {
        rules: {
            "@typescript-eslint/no-require-imports": 0,
        },
    },
    eslintPluginPrettierRecommended,
    {
        ignores: ["**/node_modules/**", "**/dist/**", "**/.next/**"],
    },
    ...compat.extends("next/core-web-vitals"),
];

export default eslintConfig;
