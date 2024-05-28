const express = require("express");
const router = express.Router();  
const professeurController = require("../controllers/ProfesseurController");
const {upload} = require("../middlewares/files");

router.get("/branches", (req, res) => {
    res.render("professeur/Branche", {
        title: "الفضاء الخاص - بالاستاد",
    });
});
const { profMiddleware } = require("../middlewares/profMiddleware");



// get view login professeur
router.get("/teacher",professeurController.loginProfAuth);

//post professeur 
router.post("/teacher",professeurController.professeurLogin)


router.get("/logoutProf", professeurController. professeur_logout,);


//get all branches*/
router.get("/branches",profMiddleware, professeurController.professeur_getBranch);









//filtrage brancheInfo
router.get("/brancheInfo",profMiddleware, professeurController.professeur_getStudentInfo);
//filtrage BrancheReasau
router.get("/BrancheReasau",profMiddleware, professeurController.professeur_getStudentResau);


/*get view add-grades prof*/ 
router.get("/add-grade-info",profMiddleware, professeurController.professeur_Add_grade);



router.get("/BrancheReasau", professeurController.professeur_getStudentResau);
/***************Cour*************/

router.get("/add-cour",professeurController.professeur_get_Cour);
router.post("/add-cour", upload.single('file'), professeurController.professeur_Add_Cour);
router.get("/edit-cour/:id",professeurController.professeur_edit_Cour_id);
router.put("/edit-cour/:id",professeurController.professeur_edit_Cour);
router.get("/cour",professeurController.Cour_index);
router.delete("/edit-cour/:id",professeurController.professeur_delete_Cour);

router.get("/Cour",(req,res)=>{
    res.render("professeur/cour",{
        title: "الفضاء الخاص - بالاستاد",
    });
});




module.exports = router;