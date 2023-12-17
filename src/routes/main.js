const express = require("express");
const router = express.Router();

// Router
router.get("/", (req, res) => {
    res.render("index");
});

router.get("/teacher", (req, res) => {
    res.render("teacher");
});

router.get("/student", (req, res) => {
    res.render("student");
});

module.exports = router;
