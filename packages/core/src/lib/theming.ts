export const getTheme = () => {
    const theme = document.cookie.match(/sb_theme=([^;]+)/)?.[1];
    return theme || "system";
};

export const changeTheme = (theme: string) => {
    const COOKIES_FLAGS =
        typeof process.env.NEXT_PUBLIC_COOKIES_FLAGS === "string" &&
        process.env.NEXT_PUBLIC_COOKIES_FLAGS !== "undefined"
            ? process.env.NEXT_PUBLIC_COOKIES_FLAGS
            : "SameSite=Strict;";
    document.cookie = `sb_theme=${theme}; Path=/;${COOKIES_FLAGS}`;
    document.documentElement.classList.remove("theme-light", "theme-dark", "theme-system");
    if (theme === "system") {
        document.documentElement.classList.add(`theme-system`);
        if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
            document.documentElement.classList.add("theme-dark");
        } else {
            document.documentElement.classList.add("theme-light");
        }
    } else {
        document.documentElement.classList.add(`theme-${theme}`);
    }
};
