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
        // req.flash("error", "Unauthorized access. Please login.");
        req.flash("error", "الرجاء تسجيل الدخول أولاً للوصول إلى لوحة التحكم.");
        return res.redirect("/admin");
    }

    try {
        const decoded = jwt.verify(adminToken, jwtSecret);
        req.directorId = decoded.directorId;
        next();
    } catch (error) {
        console.error("JWT Verification Error:", error);
        req.flash("error", "Session expired or invalid. Please login again.");
        return res.redirect("/admin");
    }
};

module.exports = { authMiddleware };
