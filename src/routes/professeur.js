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

//get all branches*/
router.get("/GroupTeachers",profMiddleware, professeurController.professeur_getBranch);

// router.get("/GroupTeachers",profMiddleware, professeurController.getGroups);

//filtrage brancheInfo
router.get("/brancheInfo",profMiddleware, professeurController.professeur_getStudentInfo);
//filtrage BrancheReasau
router.get("/BrancheReasau",profMiddleware, professeurController.professeur_getStudentResau);




router.get("/BrancheReasau", professeurController.professeur_getStudentResau);
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





//route pour getAllModuleByTeacher 

router.get("/Modulebyteachers",profMiddleware, professeurController.getAllModulesByTeacher);

module.exports = router;