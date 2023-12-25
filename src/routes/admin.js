const express = require("express");
const router = express.Router();
const DirectorSchema = require("../models/DirectorSchema");
const AddTeacher = require("../models/AddTeacherSchema");
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
 * Director - All teachers
 */
router.get("/director", authMiddleware, async (req, res) => {
    try {
        const teachers = await AddTeacher.find();

        res.render("admin/director", {
            title: "الرئيسية - لوحة القيادة",
            teachers,
        });
    } catch (error) {
        console.log(error);
    }
});

/**
 * Get /
 * Dashboard Route - Teahcers
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

/**
 * POST /
 * Dashboard - Create New eahcer.
 */
router.post("/add-teacher", authMiddleware, async (req, res) => {
    try {
        try {
            const newTeacher = AddTeacher({
                CIN: req.body.CIN,
                full_name: req.body.full_name,
                password: req.body.password,
                confirm_password: req.body.confirm_password,
                username: req.body.username,
                selected_level: req.body.selected_level,
                selected_subject: req.body.selected_subject,
            });

            await AddTeacher.create(newTeacher);

            res.redirect("/director");
        } catch (error) {
            console.log(error);
        }
    } catch (error) {
        console.log(error);
    }
});

/**
 * GET /
 * Dashboard - Get Teahcer by ID
 */
router.get("/edit-teacher/:id", authMiddleware, async (req, res) => {
    try {
        const teacherInfo = await AddTeacher.findOne({ _id: req.params.id });

        res.render("admin/edit-teacher", {
            teacherInfo,
            title: "تحديث استاذ(ة)",
        });
    } catch (error) {
        console.log(error);
    }
});

/**
 * PUT /
 * Dashboard - Edit Teahcer
//  */
router.put("/edit-teacher/:id", authMiddleware, async (req, res) => {
    try {
        await AddTeacher.findByIdAndUpdate(req.params.id, {
            CIN: req.body.CIN,
            full_name: req.body.full_name,
            password: req.body.password,
            confirm_password: req.body.confirm_password,
            username: req.body.username,
            selected_level: req.body.selected_level,
            selected_subject: req.body.selected_subject,
        });

        res.redirect("/director");
    } catch (error) {
        console.log(error);
    }
});

/**
 * DELETE /
 * Dashboard - DELETE Teahcer
//  */
router.delete("/edit-teacher/:id", authMiddleware, async (req, res) => {
    try {
        await AddTeacher.deleteOne({ _id: req.params.id });
        res.redirect("/director");
    } catch (error) {
        console.log(error);
    }
});


/**
 * GET /
 * Admin - Logout
 */
router.get("/logout", (req, res) => {
    res.clearCookie("adminToken");
    res.redirect("/admin");
});


module.exports = router;
