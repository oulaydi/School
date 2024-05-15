const DirectorSchema = require("../models/DirectorSchema");
const AddTeacher = require("../models/AddTeacherSchema");
const bcrypt = require("bcrypt");
const jwtSecret = process.env.jwtSecret;
const jwt = require("jsonwebtoken");

// login page
const loginAuth = async (req, res) => {
    try {
        res.render("admin/index", {
            title: "الإدارة - تسجيل الدخول",
            query: req.query,
            messages: req.flash(),
        });
    } catch (error) {
        console.log(error);
    }
};

// director_login
const director_login = async (req, res) => {
    let director;
    try {
        const { username, password } = req.body;
        let errorType = "";

        if (!username || !password) {
            errorType = "missingCredentials";
        } else {

              director = await DirectorSchema.findOne({ username });

            if (!director) {
                errorType = "invalidLogin";
            } else if (password.length < 5) {
                errorType = "passwordTooShort";
            } else {
                const ifPwdValid = await bcrypt.compare( password,director.password);
                if (!ifPwdValid) {
                    errorType = "invalidLogin";
                }
            }
        }

        switch (errorType) {
            case "missingCredentials":
                req.flash("error", ".اسم المستخدم وكلمة المرور مطلوبان");
                res.status(401).redirect("/admin");
                break;
            case "passwordTooShort":
                req.flash("error", ".يجب أن تكون كلمة المرور على الأقل 5 أحرف");
                res.status(401).redirect("/admin");
                break;
            case "invalidLogin":
                req.flash("error", ".اسم المستخدم أو كلمة المرور غير صحيحة");
                res.status(401).redirect("/admin");
                break;
            default:
                const adminToken = jwt.sign({ directorId: director._id }, jwtSecret);
                res.cookie("adminToken", adminToken, { httpOnly: true });
                res.redirect("/director");
                break;
        }
    } catch (error) {
        console.log(error);
        req.flash("error", "حدث خطأ. حاول مرة اخرى.");
        res.redirect("/admin");
    }
};

// director_index
const director_index = async (req, res) => {
    try {
        const teachers = await AddTeacher.find().sort({ createdAt: -1 });
        res.render("admin/director", {
            title: "الرئيسية - لوحة القيادة",
            teachers,
           
        });
       
    } catch (error) {
        console.log(error);
    }
};

// director_add
const director_add = async (req, res) => {
    try {
        const {
            CIN,
            full_name,
            password,
            confirm_password,
            username,
            selected_level,
            selected_subject,
        } = req.body;

        // Check if password matches confirm_password
        if (password !== confirm_password) {
            return res
                .status(400)
                .json({ error: "Password and confirm password do not match" });
        }

        // Hash the password before saving to MongoDB (you can use bcrypt or any other hashing library)

        //const hashedPassword = await bcrypt.hash(password, 10);


        const newTeacher = AddTeacher({
            CIN,
            full_name,
            password,
            username,
            selected_level,
            selected_subject,
        });

        await AddTeacher.create(newTeacher);
        req.flash("success","Teacher has been saved successfully!");
        res.render('admin/add-teacher',{
            messages:req.flash()
        });
        /*res.render("/admin/director", {
            err1_msg: "Teacher has been saved successfully!"
        });*/
        res.redirect("/director");
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// director_add_teacher
const directorAddTeacher = async (req, res) => {
    try {
        res.render("admin/add-teacher", {
            title: "إضافة استاذ(ة)",
        });
    } catch (error) {
        console.log(error);
    }
};

// director_edit
const director_edit = async (req, res) => {
    try {
      const { CIN, full_name, password, confirm_password, username, selected_level, selected_subject } = req.body;
  
      // Create an update object to store the values of data passing by body to ensures that only modified data are sent to the update query
      const updateObject = {};
      if (CIN) updateObject.CIN = CIN;
      if (full_name) updateObject.full_name = full_name;
      if (password) updateObject.password = password; 
      if (confirm_password) updateObject.confirm_password = confirm_password; 
      if (username) updateObject.username = username;
      if (selected_level) updateObject.selected_level = selected_level;
      if (selected_subject) updateObject.selected_subject = selected_subject;
  
      
      await AddTeacher.findByIdAndUpdate(req.params.id, updateObject);
  
      
      res.redirect("/director");
    } catch (error) {
      console.log(error);
    }
  };

// director_edit_with_ID
const director_edit_id = async (req, res) => {
    try {
        const teacherInfo = await AddTeacher.findOne({ _id: req.params.id });

        res.render("admin/edit-teacher", {
            teacherInfo,
            title: "تحديث استاذ(ة)"
            
        });
    } catch (error) {
        console.log(error);
    }
};

// director_delete
const director_delete = async (req, res) => {
    try {
        await AddTeacher.deleteOne({ _id: req.params.id });
        res.redirect("/director");
    } catch (error) {
        console.log(error);
    }
};

// director_logout
const director_logout = (req, res) => {
    res.clearCookie("adminToken");
    res.redirect("/admin");
};

// 404
const notFound = (req, res) => {
    res.render("404", {
        title: "404 - الصفحة غير موجودة",
    });
};

module.exports = {
    loginAuth,
    director_login,
    director_index,
    director_add,
    directorAddTeacher,
    director_edit,
    director_edit_id,
    director_delete,
    notFound,
    director_logout,
};
