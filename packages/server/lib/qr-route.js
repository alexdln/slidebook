import { PassThrough } from "stream";
import QRCode from "qrcode";

import { configurationStore } from "./store.js";

export const qrRoute = async (req, res) => {
    try {
        res.setHeader("content-type", "image/png");
        const qrStream = new PassThrough();
        const presentationUrl =
            req.headers.referer ||
            (req.headers.host && req.headers.host === "localhost" && "http://localhost:3000") ||
            (req.headers.host && `https://${req.headers.host}`) ||
            configurationStore.url;

        if (!presentationUrl) {
            res.statusCode = 400;
            return res.end("Bad Request");
        }

        const slideUrl = new URL(presentationUrl);
        slideUrl.pathname = "/1/f";

        QRCode.toFileStream(qrStream, slideUrl.toString(), {
            type: "png",
            width: 200,
            errorCorrectionLevel: "H",
        });

        return qrStream.pipe(res);
    } catch {
        res.statusCode = 400;
        return res.end("Bad Request");
    }
};
