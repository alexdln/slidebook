export const isAuthenticated = (password: string) => {
    return password === process.env.PASSWORD;
};
