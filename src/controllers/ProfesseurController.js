const Student = require("../models/StudenteSchema");
const AddModule = require("../models/ModuleSchema");
const AddCour = require("../models/CourSchema");


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
  
        const studentresau = await Student.find({ select_group: 'resau 23-24' });

       

       
        res.render("professeur/BrancheReasau", {
            title: "الثلاميد",
         
         
            studentresau,
        });
       
    } catch (error) {
        console.log(error);
    }
};

const professeur_get_Cour = async (req,res)=>{
    try{
       const Modules = await  AddModule.find({},"name_module");
       res.render("professeur/add-cour",{
        Modules,
        title: "الثلاميد"
       })
    }catch(error){
        console.log(error);
    }
};
const professeur_Add_Cour = async (req,res)=>{
    try{
        const { name_cour,module } = req.body;
        const newCour  = AddCour({
            name_cour,
            module
        })
       await AddCour.create(newCour);
       const Modules = await  AddModule.find({},"name_module");
       res.render('professeur/add-cour',{
        title: "الثلاميد",
        Modules
       });
    }catch(error){
        console.log(error);
    }

};
const professeur_edit_Cour = async (req,res)=>{
    try{
        const { name_cour,module } = req.body;

        const objectUpdate={};
        if(name_cour)objectUpdate.name_cour=name_cour;
        if(module)objectUpdate.module=module;

        await AddCour.findByIdAndUpdate(req.params.id,objectUpdate);
        res.redirect('/cour');
    }catch(error){
        console.log(error)
    }

}
const professeur_edit_Cour_id = async (req,res)=>{
    try{
        const Modules = await  AddModule.find({},"name_module");
    const CourInfo = await AddCour.findById({_id:req.params.id});
        res.render('professeur/edit-cour',
         { CourInfo,
            title : "إضافة تلميد(ة)",
            Modules,
    });
    }catch(error){
        console.log(error);

    }
}
const Cour_index = async (req,res)=>{
    try{
        const Cours = await AddCour.find();
        res.render("professeur/cour",{
            Cours,
            title : "إضافة تلميد(ة)"
        })
    }catch(error){
        console.log(error);

    }
}
const professeur_delete_Cour = async (req,res)=>{
    try{
        await AddCour.findOneAndDelete({_id:req.params.id});
        res.redirect("/cour");
    }catch(error){
        console.log(error);
    }
}
module.exports = {
    professeur_getStudentInfo,
    professeur_getStudentResau,

    /*---CRUD of Cour  */
    professeur_get_Cour,
    professeur_Add_Cour,
    professeur_edit_Cour,
    professeur_edit_Cour_id,
    Cour_index,
    professeur_delete_Cour
};

