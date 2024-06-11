const express = require("express");
const router = express.Router();
const StudentController = require("../controllers/StudentController");


//test controler prof  
const professeurController = require("../controllers/ProfesseurController");


router.get("/", (req, res) => {
    res.render("index", {
        title: "اللوازم المدرسية - الرئيسية",
    });
});




/**
 * PUT /
 * Dashboard - Edit steudent-profil
//  */
router.put("/profile/:id", StudentController.student_edit_id);
router.get("/profile", StudentController.student_edit);

//grades view
router.get("/gardes",);
router.get("/Gardes", (req, res) => {
    res.render("Gardes", {
        title: " الفضاء الخاص  بنقط- ",
    });
});
//absence view
router.get("/absence", (req, res) => {
    res.render("absence", {
        title: "الفضاء الخاص - بالتلاميذ",
    });
});
//modules view
router.get("/modules",StudentController.student_getModule);
//cours view
router.get("/cours/:name_module",StudentController.student_getCour);

router.get("/download/:id",StudentController.download_file);






module.exports = router;
