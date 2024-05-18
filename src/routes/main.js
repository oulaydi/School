const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("index", {
        title: "اللوازم المدرسية - الرئيسية",
    });
});

router.get("/teacher", (req, res) => {
    res.render("teacher", {
        title: "الفضاء الخاص - بالأساتذة",
    });
});

router.get("/student", (req, res) => {
    res.render("student", {
        title: "الفضاء الخاص - بالتلاميذ",
    });
});
router.get("/absence", (req, res) => {
    res.render("absence", {
        title: "الفضاء الخاص - بالتلاميذ",
    });
});
router.get("/modules", (req, res) => {
    res.render("modules", {
        title: "الفضاء الخاص - بالتلاميذ",
    });
});
router.get("/cours", (req, res) => {
    res.render("cours", {
        title: "الفضاء الخاص - بالتلاميذ",
    });
});
module.exports = router;
