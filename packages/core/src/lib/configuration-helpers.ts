export const isDefaultServer = () => {
    const appConfiguration = document.cookie.match(/sb_configuration=([^;]+)/)?.[1];
    return Boolean(appConfiguration);
};
