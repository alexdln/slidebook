// @ts-check

import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";

import { CONFIG_MAP } from "./constants.js";

export const getConfig = async () => {
    const configPath = path.join(process.cwd(), `slidebook.config.js`);
    const configUrl = pathToFileURL(configPath).href;

    if (fs.existsSync(configPath)) {
        const config = await import(configUrl);
        return config.default || config;
    }

    return {};
};

/**
 * @param {object} object
 * @param {string} key
 * @returns {any}
 */
const getKey = (object, key) => {
    return key.split(".").reduce((acc, curr) => acc && acc[curr], object);
};

/**
 * @param {import("./config").Config} fsConfig
 * @param {{[key: string]: string}} argConfig
 * @returns {import("./config").FinalConfig}
 */
export const mergeConfigs = (fsConfig, argConfig) => {
    const finalConfig = {};
    for (const mapItem of CONFIG_MAP) {
        const fsKey = mapItem.fs && getKey(fsConfig, mapItem.fs);
        const envKey = mapItem.env && process.env[mapItem.env];
        const argKey = mapItem.arg && argConfig[mapItem.arg];
        finalConfig[mapItem.key] = argKey ?? envKey ?? fsKey ?? mapItem.default;
    }

    return finalConfig;
};
