const detectTheme = () => {
    const userTheme = document.cookie.match(/sb_theme=([^;]+)/)?.[1];
    if (userTheme && ["light", "dark"].includes(userTheme)) {
        document.documentElement.classList.add(`theme-${userTheme}`);
    } else {
        document.documentElement.classList.add(`theme-system`);
        if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
            document.documentElement.classList.add("theme-dark");
        } else {
            document.documentElement.classList.add("theme-light");
        }
    }
};

export const ThemeDetector: React.FC = () => (
    <script
        dangerouslySetInnerHTML={{
            __html: `(${detectTheme})()`,
        }}
        suppressHydrationWarning
    />
);
