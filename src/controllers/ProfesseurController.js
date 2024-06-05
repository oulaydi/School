const Student = require("../models/StudenteSchema");
const AddModule = require("../models/ModuleSchema");
const AddCour = require("../models/CourSchema");
const AddTeacher = require("../models/AddTeacherSchema");
const AddGroup = require('../models/GroupSchema');
const AddSeance = require('../models/SeanceSchema');
const AddGrade = require('../models/GradeSchema');
const AddStudent =require('../models/StudenteSchema');
const Schedule =require('../models/ScheduleSchema');



const { deleteFile } = require('../middlewares/files');
const path = require('path');
const fs = require('fs');
const bcrypt = require("bcrypt");
const jwtSecret = 'yourSecretKeyHere'; 
const jwt = require("jsonwebtoken");

//get view login
const loginProfAuth = async (req, res) => {
    try {
        res.render("teacher", {
            title: "تسجيل الدخول",

        });

    } catch (error) {
        console.log(error);
    }
};

// directorDashboard
const directorDashboard = async (req, res) => {
    try {

        const teacherInfo  = await AddTeacher.findById(req.params.id).select("-password")
      

        //pour affiche obligatoir pass params -------------------------------------

           const auth_user = req.session.username;
            // Find the teacher by username
            const teacher = await AddTeacher.findOne({ username: auth_user }); 
          //search all seance teacher
          const seances = await AddSeance.find({ username: teacher.username });
          //get all sence by prof in array
           const seanceNames = seances.map(seance => seance.name_seance);
          //search i shema  Schedule  name_seance inside array above (seanceNames)
           const emploi = await Schedule.find({ name_seance: { $in: seanceNames } });

           //--------------------------------------------------------------------

        const countCour = await AddCour.countDocuments();
        const countStudent = await Student.countDocuments();
        const countModule = await AddModule.countDocuments();

        res.render("professeur/teacherDashboard",{
            title: "الثلاميد",
            countCour: countCour, 
            countModule: countModule, 
            countStudent: countStudent, 
            emploi,
            teacher,
            teacherInfo,
        });
    } catch (error) {
        console.log(error);
    }
};


//find prof and login
const professeurLogin = async (req, res) => {
    let professeur;
    try {
        const { username, password } = req.body;
        req.session.username = username;
        let errorType = "";

        if (!username || !password) {
            errorType = "missingCredentials";
        } else {
            professeur = await AddTeacher.findOne({ username });


             

        const isPasswordValid = await bcrypt.compare(password, professeur.password);
        if (!isPasswordValid) {
            req.flash("error", "اسم المستخدم أو كلمة المرور غير صحيحة.");
            return res.status(401).redirect("/teacher");
        } else if (password.length < 5) {
            req.flash("error", "يجب أن تكون كلمة المرور على الأقل 5 أحرف.");
            return res.status(401).redirect("/teacher");
        }
        }

        switch (errorType) {
            case "missingCredentials":
                req.flash("error", ".اسم المستخدم وكلمة المرور مطلوبان");
               
                res.status(401).redirect("/teacher");
                break;
            case "passwordTooShort":
                req.flash("error", ".يجب أن تكون كلمة المرور على الأقل 5 أحرف");
                res.status(401).redirect("/teacher");
                break;
            case "invalidLogin":
                req.flash("error", ".اسم المستخدم أو كلمة المرور غير صحيحة");
                res.status(401).redirect("/teacher");
                break;
            default:
                const profToken = jwt.sign({professeurId: professeur._id }, jwtSecret);
                res.cookie("profToken", profToken, { httpOnly: true });
                res.redirect("/teacherDashboard");  
                break;
        }
    } catch (error) {
        console.log(error);
        req.flash("error", "حدث خطأ. حاول مرة اخرى.");
        res.redirect("/teacher");
    }
};
// prof_logout
const professeur_logout = (req, res) => {
    res.clearCookie("profToken");
    res.redirect("/teacher");
};

/**************Cours*************/

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


//getAllModules By Teacher Note


const getAllModulesByTeacherNote = async (req, res) => {
    try {
       
        // Fetch the teacher based on username or any other unique identifier
        const auth_user= req.session.username;  
        // console.log(user2); 
        const teacher = await AddTeacher.findOne({username : auth_user }); 
       
        // If teacher is not found
        if (!teacher) {
            return res.status(404).json({ message: "Teacher not found" });
        }

        
        const seances = await AddSeance.find({ username: teacher.username });
    
        
        res.render('professeur/ModuleTeachersNote',{
            title:'Module by Teachers OK',
            seances,
            auth_user,

           
        })
    } catch (err) {
        
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
}

//get all group By Teacher Note

const getAllGroupesByTeacherNote = async (req, res) => {
    try {
   
        const auth_user= req.session.username;  

        const moduleName = req.params.moduleName;
       
      
        const teacher = await AddTeacher.findOne({username : auth_user }); 
       
       
        // If teacher is not found
        if (!teacher) {
            return res.status(404).json({ message: "Teacher not found" });
        }
     
        const groupTeacher = await AddSeance.find({ username: teacher.username,name_module: moduleName })
            //console.log('Groups found for module:', moduleName, groupTeacher);
            
   
        res.render('professeur/GroupTeachersNote',{
            title: `Groups for Module: ${moduleName}`,
            groupTeacher,
            auth_user,
    
        })
    } catch (err) {
        // Handle errors
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
}


//get All Modules By Teacher Absence

const getAllModulesByTeacherAbsence = async (req, res) => {
    try {
        // Fetch the teacher based on username or any other unique identifier
        const auth_user= req.session.username;  
        // console.log(user2); 
        const teacher = await AddTeacher.findOne({username : auth_user }); 
       
        // If teacher is not found
        if (!teacher) {
            return res.status(404).json({ message: "Teacher not found" });
        }

        
        const moudules = await AddSeance.find({ username: teacher.username });
    
        
        res.render('professeur/moduleTeacherAbsence',{
            title:'Module by Teachers OK',
            moudules,
            auth_user,

           
        })
    } catch (err) {
        
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
}


//get All groups By Teacher Absence


const getAllGroupesByTeacherAbsence = async (req, res) => {
    try {
   
        const auth_user= req.session.username;  

        const moduleName = req.params.moduleName;
       
        const teacher = await AddTeacher.findOne({username : auth_user }); 
       
        // If teacher is not found
        if (!teacher) {
            return res.status(404).json({ message: "Teacher not found" });
        }

     
        const groupTeacherAbsence = await AddSeance.find({ username: teacher.username,name_module: moduleName })
            //console.log('Groups found for module:', moduleName, groupTeacher);
   
        res.render('professeur/groupTeachersAbsence',{
            title: `Groups for Module: ${moduleName}`,
            groupTeacherAbsence,
            auth_user,
   
        })
    } catch (err) {
        // Handle errors
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
}

//get All Students By Group
const getAllStudentsByGroups = async (req, res) => {
    try {
   
        const auth_user= req.session.username;  

        const groupName = req.params.groupName;
       
        const teacher = await AddTeacher.findOne({username : auth_user }); 
       
        // If teacher is not found
        if (!teacher) {
            return res.status(404).json({ message: "Teacher not found" });
        }
     
        const StudentGroup = await AddStudent.find({ name_group: groupName })
            //console.log('Groups found for module:', moduleName, groupTeacher);
    
        res.render('professeur/Students',{
            title: `Students for Group : ${groupName}`,
            StudentGroup,
            auth_user,
    
        })
    } catch (err) {
        // Handle errors
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
}


/********************GRADES**************/
    /*getAllGrades*/
    const professeur_getGrades = async (req, res) => {
        try {
            const Grades = await AddGrade.find().sort({ createdAt: -1 });
            res.render("professeur/Grades", {
                title: "الثلاميد",
                Grades,
            });
           
        } catch (error) {
            console.log(error);
        }
    };
    
       /*add_grade  pour get view form */
       const professeur_Add_Grade = async (req, res) => {
        try {
            res.render("professeur/add-grades", {
                title: "إضافة تلميد(ة)",
            });
        } catch (error) {
            console.log(error);
        }
    };
    
     /*add_grade  methode post store une bd */
     const professeur_add_grade = async (req, res) => {
        try {
            const {
                name_module, username, grade_normal, grade_partiel, grade_final,decision  } = req.body;
    
            const newGrade = AddGrade({
                name_module, username, grade_normal, grade_partiel, grade_final,decision});
    
            await AddGrade.create(newGrade);
            req.flash("success","grade has been saved successfully!");
            res.render('professeur/add-grades',{
                messages:req.flash()
            });
            res.redirect("/grades");
            
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    };
    /*edit_grade */
    
    const  professeur_edit_grade = async (req, res) => {
        try {
          const {grade_normal, grade_partiel} = req.body;
      
          // Create an update object to store the values of data passing by body to ensures that only modified data are sent to the update query
          const updateObject = {};
            if (grade_normal) updateObject.grade_normal = grade_normal;
            if (grade_partiel) updateObject.grade_partiel = grade_partiel;
      
          await AddGrade.findByIdAndUpdate(req.params.id, updateObject);
    
          res.redirect("/Grades");
        } catch (error) {
          console.log(error);
        }
    };
    
    // edit_grade_with_ID
    const professeur_edit_grade_id = async (req, res) => {
        try {
            const gradeinfo = await AddGrade.findOne({ _id: req.params.id });
            res.render("admin/edit-grade", {
                gradeinfo,
                title: "تحديث تلميد(ة)",           
            });
        } catch (error) {
            console.log(error);
        }
    };
    
    // delete_grade
    const professeur_delete_grade = async (req, res) => {
        try {
            await AddGrade.deleteOne({ _id: req.params.id });
            res.redirect("/Grades");
        } catch (error) {
            console.log(error);
        }
    };

    //get emploi by teacher

    const professeur_Get_Emploi = async (req, res) => {
        try {
            const auth_user = req.session.username;
    
            // Find the teacher by username
            const teacher = await AddTeacher.findOne({ username: auth_user });
    
            // If teacher is not found
            if (!teacher) {
                return res.status(404).json({ message: "Teacher not found" });
            }
    
     //search all seance teacher
            const seances = await AddSeance.find({ username: teacher.username });
    
         //get all sence by prof in array
            const seanceNames = seances.map(seance => seance.name_seance);
    
           //search i shema  Schedule  name_seance inside array above (seanceNames)
            const emploi = await Schedule.find({ name_seance: { $in: seanceNames } });
    
            res.render('professeur/schedules', {
                title: "الزمن استعمال",
                emploi,
                auth_user,
            });
    
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Internal server error" });
        }
    };

    const profileTeacher = async (req, res) => {
        try {
            const teacherInfo  = await AddTeacher.findById(req.params.id).select("-password")
         
            res.render("professeur/parametre", {
                teacherInfo,
               
               title: " حسابي"
               
           });
           } catch (error) {
             console.log(error);
           }
    };




module.exports = {
    //auth
    loginProfAuth,
    professeurLogin,
    professeur_logout,
    directorDashboard,

    //profile teacher
    profileTeacher,

    //filtre
    getAllGroupesByTeacherAbsence,
    getAllModulesByTeacherAbsence,
    getAllGroupesByTeacherNote,
    getAllModulesByTeacherNote,
    getAllStudentsByGroups,

    //cours
    professeur_get_Cour,
    professeur_Add_Cour,
    professeur_edit_Cour,
    professeur_edit_Cour_id,
    Cour_index,
    professeur_delete_Cour,

    //grades
    professeur_getGrades,
    professeur_Add_Grade,
    professeur_add_grade,
    professeur_edit_grade,
    professeur_edit_grade_id,
    professeur_delete_grade,


    //emploi

    professeur_Get_Emploi,
};
