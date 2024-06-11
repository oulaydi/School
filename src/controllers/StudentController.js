const AddStudent = require("../models/StudenteSchema");
const AddModule = require("../models/ModuleSchema");
const AddCour = require("../models/CourSchema");
const fs = require('fs');
const path = require('path');
//GET USER PROFILE
const student_edit = async (req, res) => {
  try {
    const studentInfo = await AddStudent.findById(req.params.id).select("-password")
    // if(!student){
    //  return res.json({message:"NOT FOUND"})

    //}
    res.render("profile", {
      studentInfo,

      title: "تحديث حسابي(ة)"

    });
  } catch (error) {
    console.log(error);
  }
};

// student_edit_with_id

const student_edit_id = async (req, res) => {
  try {
    const { full_name, username, city, tele, email, } = req.body;

    // Create an update object to store the values of data passing by body to ensures that only modified data are sent to the update query
    const updateObject = {};

    if (full_name) updateObject.full_name = full_name;
    if (username) updateObject.username = username;
    if (city) updateObject.city = city;
    if (tele) updateObject.tele = tele;
    if (email) updateObject.email = email;


    await AddStudent.findByIdAndUpdate(req.params.id, updateObject);


    res.redirect("/director");
  } catch (error) {
    console.log(error);
  }
};

const student_getModule = async (req, res) => {
  try {
    const Modules = await AddModule.find();
    res.render("modules", {
      Modules,
      title: "تحديث حسابي(ة)"

    });

  } catch (error) {

  }
}
const student_getCour = async (req, res) => {
  try {
    const module_name= req.params.name_module;
    const Cours = await AddCour.find({module:module_name});
    res.render("cours", {
      Cours,
      title: "تحديث حسابي(ة)"

    });

  } catch (error) {

  }
}
const download_file = async (req, res) => {
  try {
    const document = await AddCour.findById(req.params.id);
    if (!document) {
      return res.status(404).send('Document not found');
    }
    // Ensure the file path is an absolute path
    const file = path.resolve(__dirname, '..', document.filePath);
    res.download(file, document.file, (err) => {
      if (err) {
        console.error('Error downloading file:', err);
        return res.status(500).send('Server Error');
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};



module.exports = {
  student_edit_id,
  student_edit,
  student_edit_id,
  student_getModule,
  student_getCour,
  download_file,
};





