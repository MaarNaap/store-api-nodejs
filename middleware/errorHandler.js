const CustomError = require("../errors/CustomError");

function errorHandler(err, req, res, next) {
    if (err instanceof CustomError) {
        return res.status(err.statusCode).send(err.message);
    };
    res.status(500).send('Internal Server Error');
};

module.exports = errorHandler;