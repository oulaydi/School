const express = require("express");
const router = express.Router();  
const professeurController = require("../controllers/ProfesseurController");
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


/*get view add-grades prof*/ 
router.get("/add-grade-info",profMiddleware, professeurController.professeur_Add_grade);


//route pour getAllModuleByTeacher 

router.get("/Modulebyteachers",profMiddleware, professeurController.getAllModulesByTeacher);

module.exports = router;