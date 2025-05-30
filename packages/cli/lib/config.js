import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";

import { CONFIG_MAP } from "./constants.js";

export const getConfig = async (type) => {
    const configPath = path.join(process.cwd(), `slidebook.${type}.js`);
    const configUrl = pathToFileURL(configPath).href;

    if (fs.existsSync(configPath)) {
        const config = await import(configUrl);
        return config.default || config;
    }

    return {};
};

const getKey = (object, key) => {
    return key.split(".").reduce((acc, curr) => acc && acc[curr], object);
};

export const mergeConfigs = (fsConfig, argConfig) => {
    const finalConfig = {};
    for (const mapItem of CONFIG_MAP) {
        const fsKey = getKey(fsConfig, mapItem.fs);
        const envKey = process.env[mapItem.env];
        const argKey = argConfig[mapItem.arg];
        finalConfig[mapItem.arg] = argKey ?? envKey ?? fsKey ?? mapItem.default;
    }

    return finalConfig;
};
