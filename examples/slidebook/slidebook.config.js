module.exports = {
    width: 600,
    height: 1200,
    auth: (req) => {
        if (req.body.password === "123456") {
            return true;
        }
        return false;
    },
};
