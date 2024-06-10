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
router.get("/modules", (req, res) => {
    res.render("modules", {
        title: "الفضاء الخاص - بالتلاميذ",
    });
});
//cours view
router.get("/cours", (req, res) => {
    res.render("cours", {
        title: "الفضاء الخاص - بالتلاميذ",
    });
});



router.get("/dashbordstudent", (req, res) => {
    res.render("dashboardStudent", {
        title: "الفضاء الخاص - بالتلاميذ",
    });
});



//





module.exports = router;
