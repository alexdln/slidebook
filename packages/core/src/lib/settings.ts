export const SLIDE_WIDTH =
    !process.env.NEXT_PUBLIC_SLIDE_WIDTH || Number.isNaN(+process.env.NEXT_PUBLIC_SLIDE_WIDTH)
        ? 1200
        : Number(process.env.NEXT_PUBLIC_SLIDE_WIDTH);

export const SLIDE_HEIGHT =
    !process.env.NEXT_PUBLIC_SLIDE_HEIGHT || Number.isNaN(+process.env.NEXT_PUBLIC_SLIDE_HEIGHT)
        ? 680
        : Number(process.env.NEXT_PUBLIC_SLIDE_HEIGHT);

export const CONFIGURED_SERVER =
    process.env.NEXT_PUBLIC_DEFAULT_SERVER ||
    (typeof process.env.NEXT_PUBLIC_SERVER_URL === "string" && process.env.NEXT_PUBLIC_SERVER_URL !== "undefined");

export const COOKIES_FLAGS =
    typeof process.env.NEXT_PUBLIC_COOKIES_FLAGS === "string" && process.env.NEXT_PUBLIC_COOKIES_FLAGS !== "undefined"
        ? process.env.NEXT_PUBLIC_COOKIES_FLAGS
        : "SameSite=Strict;";
