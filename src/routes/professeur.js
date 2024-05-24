const express = require("express");
const router = express.Router();  
const professeurController = require("../controllers/ProfesseurController");


router.get("/branches", (req, res) => {
    res.render("professeur/Branche", {
        title: "الفضاء الخاص - بالاستاد",
    });
});



//filtrage brancheInfo
router.get("/brancheInfo", professeurController.professeur_getStudentInfo);
//filtrage BrancheReasau
router.get("/BrancheReasau", professeurController.professeur_getStudentResau);
module.exports = router;