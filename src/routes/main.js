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



/**
 * PUT /
 * Dashboard - Edit steudent-profil
//  */
router.put("/profile/:id", StudentController.student_edit_id);
router.get("/profile", StudentController.student_edit);









module.exports = router;
