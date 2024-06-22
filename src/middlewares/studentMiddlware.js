const jwt = require("jsonwebtoken");

const jwtSecret = 'yourSecretKeyHere'; 


// MiddleWare - Cookie
/**
 * Check Login
 */
const studentMiddlware = (req, res, next) => {

    // Check if profToken is present in cookies
    const studentToken = req.cookies.studentToken;
    if (!studentToken) {
        req.flash("error", "الرجاء تسجيل الدخول أولاً للوصول إلى لوحة التحكم.");
        return res.redirect("/student");
    }

    try {
        const decoded = jwt.verify(studentToken, jwtSecret);
        req.studentId = decoded.studentId;
 
        next();
    } catch (error) {
        console.error("JWT Verification Error:", error);
        req.flash("error", "انتهت صلاحية التسجيل, المرجو اعادة التسجيل.");
        return res.redirect("/student");
    }
};

module.exports = { studentMiddlware };
