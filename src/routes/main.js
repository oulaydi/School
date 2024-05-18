const express = require("express");
const router = express.Router();
const StudentController = require("../controllers/StudentController");

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
/**
 * PUT /
 * Dashboard - Edit steudent-profil
//  */
router.put("/profile/:id", StudentController.student_edit_id);
router.get("/profile", StudentController.student_edit);

//grades
router.get("/gardes",);
router.get("/Gardes", (req, res) => {
    res.render("Gardes", {
        title: " الفضاء الخاص  بنقط- ",
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
