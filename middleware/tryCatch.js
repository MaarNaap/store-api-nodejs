function tryCatch(fn) {
    return async (req, res, next) => {
        try {
            await fn(req, res, next);
        } catch (error) {
            console.log(error);
            // next(error);
            res.status(500).send('Error in tryCatch::' + error.message);
        }
    }
};

module.exports = tryCatch;