const jwt = require('jsonwebtoken');

function authorizeUser(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) return res.status(401).send('Forbidden: Unauthorized. Send authorization headers in your request. Use POSTMAN.');
    const token = authHeader.split(' ')[1];
    try {
        const decodedToken = jwt.verify(token, 'SecretKeyHere'); // use try catch here
        const { username, id } = decodedToken;
        req.user = { username, id };
        next();
    } catch (error) {
        res.status(401).send('Can\'t authorize. ' + error);
    }
};

module.exports = authorizeUser;