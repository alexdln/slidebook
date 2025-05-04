import { authenticate } from "./authenticate.js";

export const authRoute = async (req, res) => {
    try {
        const body = await new Promise((resolve) => {
            const bodyParts = [];
            req.on("data", (chunk) => {
                bodyParts.push(chunk);
            });
            req.on("end", () => {
                resolve(Buffer.concat(bodyParts).toString());
            });
        });

        const { secret } = JSON.parse(body);
        if (authenticate(secret)) {
            return res.end(secret);
        }
        res.statusCode = 401;
        return res.end("Unauthorized");
    } catch {
        res.statusCode = 400;
        return res.end("Bad Request");
    }
};
