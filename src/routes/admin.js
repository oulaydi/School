const express = require("express");
const router = express.Router();
const DirectorSchema = require("../models/DirectorSchema");

/**
 * GET /
 * Director - Admin page
 */

router.get("/admin", async (req, res) => {
    try {
        res.render("admin/index");
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
