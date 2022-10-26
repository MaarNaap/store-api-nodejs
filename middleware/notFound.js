module.exports = function notFound(req, res, next) {
    res.status(404).send('Error:: Resource Not Found');
};
