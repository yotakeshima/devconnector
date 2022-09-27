const jwt = require('jsonwebtoken');
const config = require('config');


// Exports a middleware function
module.exports = function(req, res, next) {
    //Get token from the header
    const token = req.header('x-auth-token');

    // Check if no token
    if(!token){
        // 401 status means not authorized. If no token and the route is protected using the middleware, return error.
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // Verify Token
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        
        // Set the req.user as the decoded token. Then we can use the req.user in any route.
        // Decoded token should contain User id.
        req.user = decoded.user;
        next();
    } catch(err){
        res.status(401).json({ msg: 'Token is not valid' });

    }
}