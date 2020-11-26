const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.header('auth-token');

    if (!token) return res.status(401).send('Access Denied');

    try {
        jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
            if (err) {
                console.log(err);
                res.status(401).send('AcessToken Denied');
            } else {
                req.user._id = decoded._id;
                req.isLoggedIn = true;
                next();
            }
        });
    } catch (err) {
        return res.status(400).send('Invalid Token');
    }
};