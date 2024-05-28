const Student = require("../models/StudenteSchema");

const AddTeacher = require("../models/AddTeacherSchema");
const AddGroup = require('../models/GroupSchema');
const AddSeance = require('../models/SeanceSchema');

//require("dotenv").config();
//const jwtSecret = process.env.jwtSecretProf;


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
//find prof and login
const professeurLogin = async (req, res) => {
    let professeur;
    try {
        const { username, password } = req.body;
        let errorType = "";

        if (!username || !password) {
            errorType = "missingCredentials";
        } else {
            professeur = await AddTeacher.findOne({ username });


             // If user doesn't exist, create a new one
        if (!professeur) {
            // Create new user
            const hashedPassword = await bcrypt.hash(password, 10);
            professeur = new ProfesseurSchema({ username, password: hashedPassword });
            await professeur.save();

            req.flash("success", "تم إنشاء الحساب بنجاح.");
            return res.redirect("/teacher");
        }

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
                res.redirect("/Modulebyteachers");  
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





/*get prof all branches  */
const professeur_getBranch = async (req, res) => {
    try {
        const groups = await AddGroup.find({}, 'name_group'); // Récupère uniquement le champ name_group
        res.render('professeur/GroupTeachers',
        {  
            title: "إضافة تلميد(ة)",
            groups,
        }
    ); // Passe les sujets à la vue
    } catch (error) {
        res.status(500).send({ message: 'Error retrieving groups' });
    }
};

/*get prof  brancheInfo  */
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

/*get prof  brancheResau */
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


const professeur_Add_grade = async (req, res) => {
    try {
        res.render("professeur/add-grade-info", {
            title: "الثلاميد",

        });

    } catch (error) {
        console.log(error);
    }
};


//getAllModules By Teacher

// Your controller function
const getAllModulesByTeacher = async (req, res) => {
    try {
        // Fetch the teacher based on username or any other unique identifier
        // const user2= req.body.username;  
        // console.log(user2); 
        const teacher = await AddTeacher.findOne({username : "my.samiri" }); // Assuming you pass the teacher's username in the request parameters
        console.log(teacher);
        // If teacher is not found
        if (!teacher) {
            return res.status(404).json({ message: "Teacher not found" });
        }

        // Fetch module with the same selected subject as the teacher
        const seances = await AddSeance.find({ username: teacher.username });
        console.log(seances);
        // Send the groups as response
        res.render('professeur/ModuleTeachers',{
            title:'Module by Teachers OK',
            seances,
        })
    } catch (err) {
        // Handle errors
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
}



module.exports = {
    //auth
    loginProfAuth,
    professeurLogin,
    professeur_logout,
    professeur_getStudentInfo,
    professeur_getStudentResau,
    professeur_getBranch,
    professeur_Add_grade,
    getAllModulesByTeacher,
    
};

