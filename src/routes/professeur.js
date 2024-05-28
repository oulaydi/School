const express = require("express");
const router = express.Router();  
const professeurController = require("../controllers/ProfesseurController");
const {upload} = require("../middlewares/files");

router.get("/branches", (req, res) => {
    res.render("professeur/Branche", {
        title: "الفضاء الخاص - بالاستاد",
    });
});



//filtrage brancheInfo
router.get("/brancheInfo", professeurController.professeur_getStudentInfo);
//filtrage BrancheReasau
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