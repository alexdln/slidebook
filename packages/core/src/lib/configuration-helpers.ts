export const isDefaultServer = () => {
    const appConfiguration = document.cookie.match(/sb_default_server=([^;]+)/)?.[1];
    return Boolean(appConfiguration);
};
