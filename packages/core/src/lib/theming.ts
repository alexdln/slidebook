export const getTheme = () => {
    const theme = document.cookie.match(/sb_theme=([^;]+)/)?.[1];
    return theme || "system";
};

export const changeTheme = (theme: string) => {
    document.cookie = `sb_theme=${theme}; Path=/; SameSite=Strict`;
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
