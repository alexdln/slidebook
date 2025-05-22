const detectConfiguration = () => {
    if (document.cookie.match(/sb_configuration=([^;]+)/)) {
        document.documentElement.classList.add("sb-default-server");
    }
};

export const ConfigurationDetector: React.FC = () => (
    <script
        dangerouslySetInnerHTML={{
            __html: `(${detectConfiguration})()`,
        }}
        suppressHydrationWarning
    />
);
