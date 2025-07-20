const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const authMiddleware = require('./middleware/authMiddleware.js');
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Middleware to set up session management
app.use("/customer", session({ secret: process.env.SECRET_KEY, resave: true, saveUninitialized: true }))

app.use("/customer/auth/*", function auth(req, res, next) {
    //Write the authentication mechanism here

    const authHeader = req.headers['authorization'];

    // 1. Check if Authorization header exists
    if (!authHeader) {
        return res.status(401).json({ message: "Authorization header missing" });
    }

    // 2. Get the token from 'Bearer <token>'
    const token = authHeader.split(' ')[1];
    console.log("Token received:", token);
    if (!token) {
        return res.status(401).json({ message: "Token missing" });
    }
    // 3. Verify token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // secret must match your login/sign token
        req.user = decoded; // attach decoded user data to request object
        console.log("Token verified successfully for user:", req.user.username);

        next(); // continue to route
    } catch (err) {
        return res.status(403).json({ message: "Invalid or expired token" });
    }

});

app.use("/customer", customer_routes);
app.use("/book", authMiddleware, genl_routes);

app.get("/health", (req, res) => {
    res.status(200);
    res.send("Server is healthy on port " + PORT);
});

app.listen(PORT, () => console.log("Server is running on port: ", PORT));
