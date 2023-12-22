const express = require("express");
const router = express.Router();
const DirectorSchema = require("../models/DirectorSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.jwtSecret;

// MiddleWare - Cookie
/**
 * Check Login
 */
const authMiddleware = (req, res, next) => {
    const adminToken = req.cookies.adminToken;
    if (!adminToken) {
        return res.status(401).json({ message: "Unauthorized login!" });
    }

    try {
        const decoded = jwt.verify(adminToken, jwtSecret);
        req.directorId = decoded.directorId;
        next();
    } catch (error) {
        res.status(401).json({ message: "Unauthorized!" });
    }
};

/**
 * GET /
 * Director - Admin page
 */
router.get("/admin", async (req, res) => {
    try {
        res.render("admin/index", {
            title: "الإدارة - تسجيل الدخول",
        });
    } catch (error) {
        console.log(error);
    }
});

/**
 * POST /
 * Director - Admin check login
 */
router.post("/admin", async (req, res) => {
    try {
        const { username, password } = req.body;

        const director = await DirectorSchema.findOne({ username });
        if (!director) {
            return res.status(401).json({ message: "Invalid infos" });
        }

        const ifPwdValid = await bcrypt.compare(password, director.password);
        if (!ifPwdValid) {
            return res.status(401).json({ message: "Invalid infos" });
        }

        const adminToken = jwt.sign({ directorId: director._id }, jwtSecret);
        res.cookie("adminToken", adminToken, { httpOnly: true });

        res.redirect("/director");
    } catch (error) {
        console.log(error);
    }
});

/**
 * GET /
 * Director - Dashboard
 */
router.get("/director", authMiddleware, async (req, res) => {
    try {
        res.render("admin/director", {
            title: "الرئيسية - لوحة القيادة",
        });
    } catch (error) {
        console.log(error);
    }
});

/**
 * Post /
 * Dashboard - Create New eahcer
 */
router.get("/add-teacher", authMiddleware, async (req, res) => {
    try {
        res.render("admin/add-teacher", {
            title: "إضافة استاذ(ة)",
        });
    } catch (error) {
        console.log(error);
    }
});







module.exports = router;
