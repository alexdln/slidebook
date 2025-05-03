export const isAuthenticated = (password) => {
    return password === process.env.PASSWORD;
};
