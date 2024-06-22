const AddModule = require("../models/ModuleSchema");
const AddCour = require("../models/CourSchema");
const AddStudent = require("../models/StudenteSchema");
const Addgrade = require("../models/GradeSchema");


const fs = require('fs');
const path = require('path');


const bcrypt = require("bcrypt");
const jwtSecret = 'yourSecretKeyHere'; 
const jwt = require("jsonwebtoken");

//get view login
const loginstudentAuth = async (req, res) => {
  try {
      res.render("student", {
          title: "تسجيل الدخول",

      });

  } catch (error) {
      console.log(error);
  }
};
//find prof and login
const StudentLogin = async (req, res) => {
  let student;
  try {
    const { username, password } = req.body;
    req.session.username = username;
    let errorType = "";

    if (!username || !password) {
      errorType = "missingCredentials";
    } else {
      student = await AddStudent.findOne({ username });
   
      if (!student) {
        errorType = "invalidLogin";
      } else {
        const isPasswordValid = await bcrypt.compare(password, student.password);
        if (!isPasswordValid) {
          req.flash("error", "اسم المستخدم أو كلمة المرور غير صحيحة.");
          return res.status(401).redirect("/student");
        } else if (password.length < 5) {
          req.flash("error", "يجب أن تكون كلمة المرور على الأقل 5 أحرف.");
          return res.status(401).redirect("/student");
        }
      }
    }

    switch (errorType) {
      case "missingCredentials":
        req.flash("error", ".اسم المستخدم وكلمة المرور مطلوبان");
        res.status(401).redirect("/student");
        break;
      case "passwordTooShort":
        req.flash("error", ".يجب أن تكون كلمة المرور على الأقل 5 أحرف");
        res.status(401).redirect("/student");
        break;
      case "invalidLogin":
        req.flash("error", ".اسم المستخدم أو كلمة المرور غير صحيحة");
        res.status(401).redirect("/student");
        break;
      default:
        const studentToken = jwt.sign({ studentId: student._id }, jwtSecret);
        res.cookie("studentToken", studentToken, { httpOnly: true });
        res.redirect("/dashbordstudent");
        break;
    }
  } catch (error) {
    console.log(error);
    req.flash("error", "حدث خطأ. حاول مرة اخرى.");
    res.redirect("/student");
  }
};


// student_logout
const student_logout = (req, res) => {
  res.clearCookie("studentToken");
  res.redirect("/student");
};



// dashboard student
const dashboardStusent = async (req, res) => {
  try {

    const auth_user = req.session.username;
    // Find the teacher by username
    const studeent = await AddStudent.findOne({ username: auth_user });     
    

      //pour affiche obligatoir pass params -------------------------------------

        // const auth_user = req.session.username;


          // Find the teacher by username
        //  const teacher = await AddTeacher.findOne({ username: auth_user }); 
       
   

         //--------------------------------------------------------------------

      const countCour = await AddCour.countDocuments();
      
      const countModule = await AddModule.countDocuments();

      res.render("dashboardStudent",{
        
          title: "الثلاميد",
          countCour: countCour, 
          countModule: countModule, 
         //info student
         studeent,
       
      });
  } catch (error) {
      console.log(error);
  }
};





const getStudentGrades = async (req, res) => {
  try {
    const auth_user = req.session.username;
    
    const grades = await Addgrade.find({ username: auth_user });

     grades.forEach(grade => {
      const createdAt = new Date(grade.createdAt);
      
      const currentTime = new Date();
      const timeDifference = currentTime - createdAt;

      if (timeDifference < 60000) { 
        grade.timePassed = Math.floor(timeDifference / 1000) + ' seconds ago';
      } else if (timeDifference < 3600000) { // Less than 1 hour
        grade.timePassed = Math.floor(timeDifference / 60000) + ' minutes ago';
      } else if (timeDifference < 86400000) { // Less than 1 day
        grade.timePassed = Math.floor(timeDifference / 3600000) + ' hours ago';
      } else { 
        grade.timePassed = Math.floor(timeDifference / 86400000) + ' days ago';
      }
    });
    res.render("Gardes", {
      title: "الثلاميد",
      grades,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};









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

  //login
  StudentLogin,
  student_logout,
  loginstudentAuth,
  dashboardStusent,

  //
  student_edit_id,
  student_edit,
  student_edit_id,
  student_getModule,
  student_getCour,
  download_file,


  //gardes student

  getStudentGrades,
};





