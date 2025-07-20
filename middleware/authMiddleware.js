const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];

    // 1. Check if Authorization header exists
    if (!authHeader) {
        return res.status(401).json({ message: "Authorization header missing" });
    }

    // 2. Get the token from 'Bearer <token>'
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "Token missing" });
    }

    // 3. Verify token
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        console.log("decoded:", decoded);
        req.user = decoded; // attach decoded user data to request object
        console.log("Token verified successfully for user:", req.user.username);

        next(); // continue to route
    } catch (err) {
        return res.status(403).json({ message: "Invalid or expired token" });
    }
}   

module.exports = authMiddleware;