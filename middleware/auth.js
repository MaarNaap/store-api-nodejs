const jwt = require('jsonwebtoken');
const BadRequest = require('../errors/BadRequest');
const Unauthorized = require('../errors/Unauthorized');

function authorizeUser(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) throw new BadRequest('Bad Request. Send authorization headers.');
    const token = authHeader.split(' ')[1];
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const { username, id } = decodedToken;
        req.user = { username, id };
        next();
    } catch (error) {
        // res.status(401).send('Can\'t authorize. ' + error);
        throw new Unauthorized('Can\'t authorize you:: ' + error);
    };
};

module.exports = authorizeUser;