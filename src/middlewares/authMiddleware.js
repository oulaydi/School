const jwt = require("jsonwebtoken");
const jwtSecret = process.env.jwtSecret;
require("dotenv").config();

// MiddleWare - Cookie
/**
 * Check Login
 */
const authMiddleware = (req, res, next) => {

    // Check if adminToken is present in cookies
    const adminToken = req.cookies.adminToken;
    if (!adminToken) {
        return res.status(401).redirect("/admin?error=unauthorized");
    }

    try {
        const decoded = jwt.verify(adminToken, jwtSecret);
        req.directorId = decoded.directorId;
        next();
    } catch (error) {
        console.error("JWT Verification Error:", error);
        return res.redirect("/admin?error=unauthorized");
    }
};

module.exports = { authMiddleware }