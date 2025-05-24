const detectConfiguration = () => {
    if (document.cookie.match(/sb_default_server=([^;]+)/)) {
        document.documentElement.classList.add("sb-default-server");
    }
    if (document.cookie.match(/sb_qr_visible=([^;]+)/)?.[1] === "true") {
        document.documentElement.classList.add("sb-qr-visible");
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
