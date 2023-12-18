const express = require("express");
const router = express.Router();

// Router
router.get("/", (req, res) => {
    res.render("index", {
        title: "اللوازم المدرسية - الرئيسية"
    });
});

router.get("/teacher", (req, res) => {
    res.render("teacher",  {
        title: "الفضاء الخاص - بالأساتذة"
    });
});

router.get("/student", (req, res) => {
    res.render("student", {
        title: "الفضاء الخاص - بالتلاميذ"
    });
});

module.exports = router;
