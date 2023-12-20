const express = require("express");
const router = express.Router();
const DirectorSchema = require("../models/DirectorSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.jwtSecret;

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

        res.redirect("/directorPannel");
    } catch (error) {
        console.log(error);
    }
});


/**
 * POST /
 * Admin pannel - Dashboard
 */
router.get("/admin", async (req, res) => {
  res.render("admin/directorPannel");
});


module.exports = router;
