import { COOKIES_FLAGS } from "./settings";

export const getQrVisible = () => {
    const visible = document.cookie.match(/sb_qr_visible=([^;]+)/)?.[1];
    return visible || "false";
};

export const changeQrVisible = (visible: string) => {
    document.cookie = `sb_qr_visible=${visible}; Path=/;${COOKIES_FLAGS}`;
    if (visible === "true") {
        document.documentElement.classList.add("sb-qr-visible");
    } else {
        document.documentElement.classList.remove("sb-qr-visible");
    }
};
