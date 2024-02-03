const express = require("express");
const router = express.Router();
const AddTeacher = require("../models/AddTeacherSchema");
const directorController = require("../controllers/directorController");
const jwtSecret = process.env.jwtSecret;
const jwt = require("jsonwebtoken");

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

/**
 * GET /
 * Director - Admin page
 */
router.get("/admin", directorController.loginAuth);

/**
 * POST /
 * Director - Admin check login
 */
router.post("/admin", directorController.director_login);

/**
 * GET /
 * Director - All teachers
 */
router.get("/director", authMiddleware, directorController.director_index);

/**
 * Get /
 * Dashboard Route - Teahcers
 */
router.get("/add-teacher", authMiddleware, directorController.directorAddTeacher);

/**
 * POST /
 * Dashboard - Create New eahcer.
 */
router.post("/add-teacher", authMiddleware, directorController.director_add);

/**
 * GET /
 * Dashboard - Get Teahcer by ID
 */
router.get("/edit-teacher/:id", authMiddleware, directorController.director_edit_id);

/**
 * PUT /
 * Dashboard - Edit Teahcer
//  */
router.put("/edit-teacher/:id", authMiddleware, directorController.director_edit);

/**
 * DELETE /
 * Dashboard - DELETE Teahcer
//  */
router.delete("/edit-teacher/:id", authMiddleware, directorController.director_delete);

/**
 * GET /
 * Admin - Logout
 */
router.get("/logout", directorController.director_logout);

module.exports = router;
