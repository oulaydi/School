const Student = require("../models/StudenteSchema");
const AddModule = require("../models/ModuleSchema");
const AddCour = require("../models/CourSchema");
const { deleteFile } = require('../middlewares/files');
const path = require('path');
const fs = require('fs');

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

const professeur_get_Cour = async (req, res) => {
    try {
        const Modules = await AddModule.find({}, "name_module");
        res.render("professeur/add-cour", {
            Modules,
            title: "الثلاميد"
        });
    } catch (error) {
        console.log(error);
    }
};
const professeur_Add_Cour = async (req, res) => {
    try {
        const { name_cour, module } = req.body;
        const { filename } = req.file;

        const newCour = new AddCour({
            name_cour,
            module,
            file: filename,
            filePath: path.normalize(path.join('uploads', filename))
        });

        await newCour.save();

        // Redirect to the desired route upon successful form submission
        res.redirect("/cour");
    } catch (error) {
        console.log(error);
        // Handle error if needed
        res.status(500).send("Internal Server Error");
    }
};

const professeur_edit_Cour = async (req, res) => {
    try {
        const { name_cour, module } = req.body;
        const objectUpdate = {};
        if (name_cour) objectUpdate.name_cour = name_cour;
        if (module) objectUpdate.module = module;

        await AddCour.findByIdAndUpdate(req.params.id, objectUpdate);
        res.redirect('/cour');
    } catch (error) {
        console.log(error);
    }
};

const professeur_edit_Cour_id = async (req, res) => {
    try {
        const Modules = await AddModule.find({}, "name_module");
        const CourInfo = await AddCour.findById(req.params.id);
        res.render('professeur/edit-cour', {
            CourInfo,
            title: "إضافة تلميد(ة)",
            Modules,
        });
    } catch (error) {
        console.log(error);
    }
};

const Cour_index = async (req, res) => {
    try {
        const Cours = await AddCour.find();
        res.render("professeur/cour", {
            Cours,
            title: "إضافة تلميد(ة)"
        });
    } catch (error) {
        console.log(error);
    }
};
const professeur_delete_Cour = async (req, res) => {
    try {
        const cour = await AddCour.findById(req.params.id);
        if (cour) {
            // Construct the file path 
            const filePath = path.join(__dirname, '..', cour.filePath);
            console.log("File path to delete:", filePath); 

            // Check if the file exists before attempting to delete it
            if (fs.existsSync(filePath)) {
                console.log("File exists, proceeding with deletion.");
                await AddCour.findByIdAndDelete(req.params.id);
                deleteFile(filePath, (err) => {
                    if (err) {
                        console.error("Failed to delete file:", err);
                    }
                });
            } else {
                console.error("File does not exist, cannot delete.");
            }
        }
        res.redirect("/cour");
    } catch (error) {
        console.log(error);
    }
};


module.exports = {
    professeur_getStudentInfo,
    professeur_getStudentResau,
    professeur_get_Cour,
    professeur_Add_Cour,
    professeur_edit_Cour,
    professeur_edit_Cour_id,
    Cour_index,
    professeur_delete_Cour
};
