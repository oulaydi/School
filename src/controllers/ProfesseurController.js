const Student = require("../models/StudenteSchema");



const professeur_getStudentInfo = async (req, res) => {
    try {
  
        const studentinfo = await Student.find({ select_group: 'INFO2 23-24' });

       

       
        res.render("professeur/brancheInfo", {
            title: "الثلاميد",
         
         
            studentinfo,
        });
       
    } catch (error) {
        console.log(error);
    }
};
const professeur_getStudentResau = async (req, res) => {
    try {
  
        const studentresau = await Student.find({ select_group : 'DevOp2 23-24'  });

       

       
        res.render("professeur/BrancheReasau", {
            title: "الثلاميد",
         
         
            studentresau,
        });
       
    } catch (error) {
        console.log(error);
    }
};



module.exports = {
    professeur_getStudentInfo,
    professeur_getStudentResau,
};

