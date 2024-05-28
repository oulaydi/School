const jwt = require("jsonwebtoken");

const jwtSecret = 'yourSecretKeyHere'; 


// MiddleWare - Cookie
/**
 * Check Login
 */
const profMiddleware = (req, res, next) => {

    // Check if profToken is present in cookies
    const profToken = req.cookies.profToken;
    if (!profToken) {
        req.flash("error", "الرجاء تسجيل الدخول أولاً للوصول إلى لوحة التحكم.");
        return res.redirect("/teacher");
    }

    try {
        const decoded = jwt.verify(profToken, jwtSecret);
        req.professeurId = decoded.professeurId;
 
        next();
    } catch (error) {
        console.error("JWT Verification Error:", error);
        req.flash("error", "انتهت صلاحية التسجيل, المرجو اعادة التسجيل.");
        return res.redirect("/teacher");
    }
};

module.exports = { profMiddleware };
