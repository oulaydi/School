const express = require("express");
const router = express.Router();
const DirectorSchema = require("../models/DirectorSchema");

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

router.get("/admin", (req, res) => {
    res.render("admin/index", {
        title: "الإدارة - تسجيل الدخول",
    });
});

module.exports = router;
