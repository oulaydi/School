const express = require("express");
const router = express.Router();  
const professeurController = require("../controllers/ProfesseurController");
const {upload} = require("../middlewares/files");
const { profMiddleware } = require("../middlewares/profMiddleware");


// get view login professeur
router.get("/teacher",professeurController.loginProfAuth);

//post professeur 
router.post("/teacher",professeurController.professeurLogin)

router.get("/logoutProf", professeurController. professeur_logout,);


//get teacher's main dashboard*/
router.get("/teacherDashboard", professeurController.directorDashboard);

/***************Cour*************/
/**
 * GET /
 * Cour - Add Modules
 */
router.get("/add-cour",professeurController.professeur_get_Cour);
/**
 * GET /
 * Cour - Add Modules
 */
router.post("/add-cour", upload.single('file'), professeurController.professeur_Add_Cour);
/**
 * GET /
 * Cour - edit Modules by id
 */
router.get("/edit-cour/:id",professeurController.professeur_edit_Cour_id);
/**
 * GET /
 * Cour - edit Modules
 */
router.put("/edit-cour/:id",professeurController.professeur_edit_Cour);
/**
 * GET /
 * Cour - get All Modules
 */
router.get("/cour",professeurController.Cour_index);
/**
 * GET /
 * Cour - delete Modules
 */
router.delete("/edit-cour/:id",professeurController.professeur_delete_Cour);


//route pour getAllModuleByTeacherNote
router.get("/ModulebyteacherNote",profMiddleware, professeurController.getAllModulesByTeacherNote);

//router.get("/groupbyteacher",profMiddleware, professeurController.getAllGroupesByTeacher);

//route pour getAllgroupByTeacherNote
router.get("/groupbyteacherNote/:moduleName", profMiddleware, professeurController.getAllGroupesByTeacherNote);


//route pour getAllModuleByTeacherAbsence
router.get("/ModulebyteacherAbsence",profMiddleware, professeurController.getAllModulesByTeacherAbsence);


//route pour getAllgroupByTeacherAbsence
router.get("/groupbyteacherAbsence/:moduleName", profMiddleware, professeurController.getAllGroupesByTeacherAbsence);

//route pour getAllStudentsByGroups
router.get("/studentsbygroupsNote/:groupName", profMiddleware, professeurController.getAllStudentsByGroups);


//Grades

router.get("/add-grade", profMiddleware, professeurController.professeur_Add_Grade);




module.exports = router;