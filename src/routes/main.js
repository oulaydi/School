const express = require("express");
const router = express.Router();
const StudentController = require("../controllers/StudentController");
const { studentMiddlware } = require("../middlewares/studentMiddlware");



//test controler prof  
const professeurController = require("../controllers/ProfesseurController");


router.get("/", (req, res) => {
    res.render("index", {
        title: "اللوازم المدرسية - الرئيسية",
    });
});

//get view auth
router.get("/student", StudentController.loginstudentAuth);


//fetch stuent login
router.post("/student", StudentController.StudentLogin)


//get student's main dashboard*/
router.get("/dashbordstudent",studentMiddlware, StudentController.dashboardStusent);


//grades view
router.get("/Gardes",studentMiddlware,StudentController.getStudentGrades);


//logaout student 
router.get("/logoutstudent", StudentController.student_logout)


/**
 * PUT /
 * Dashboard - Edit steudent-profil
//  */
router.put("/profile/:id", StudentController.student_edit_id);
router.get("/profile", StudentController.student_edit);


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




//cours view
router.get("/EmploiStudent", (req, res) => {
    res.render("EmploiStudent", {
        title: "الفضاء الخاص - بالتلاميذ",
    });
});


//





module.exports = router;
