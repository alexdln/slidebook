export const authenticate = (password) => {
    return password === process.env.PASSWORD;
};

export const validateSecret = (secret) => {
    return secret === process.env.PASSWORD;
};
