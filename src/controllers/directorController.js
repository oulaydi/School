const DirectorSchema = require("../models/DirectorSchema");
const AddTeacher = require("../models/AddTeacherSchema");
const AddStudent = require("../models/StudenteSchema");
const AddRoom = require("../models/RoomSchema");
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
            birthday,
            selected_birthplace,
            num_tel,
            email,
            username,
            password,
            confirm_password,

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
            birthday,
            selected_birthplace,
            num_tel,
            email,
            username,
            password,
            confirm_password,
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
      const {CIN,full_name,birthday,selected_birthplace,num_tel,email,username, password,confirm_password, } = req.body;
  
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



/* director_student  */


    /*getAllStudent*/
const director_getStudent = async (req, res) => {
    try {
        const Students = await AddStudent.find().sort({ createdAt: -1 });
        res.render("admin/Students", {
            title: "الثلاميد",
            Students,
            
           
        });
       
    } catch (error) {
        console.log(error);
    }
};

   /*add_student  pour get view form */
   const director_Add_Student = async (req, res) => {
    try {
        res.render("admin/add-student", {
            title: "إضافة تلميد(ة)",
        });
    } catch (error) {
        console.log(error);
    }
};

 /*add_student  methode post store une bd */
 const director_add_student = async (req, res) => {
    try {
        const {
            INE, full_name, username, birthday, selected_birthplace, email, password } = req.body;

       

        // Hash the password before saving to MongoDB (you can use bcrypt or any other hashing library)
        //const hashedPassword = await bcrypt.hash(password, 10);
        const newStudent = AddStudent({
            INE, full_name, username, birthday, selected_birthplace, email, password});

        await AddStudent.create(newStudent);
        req.flash("success","student has been saved successfully!");
        res.render('admin/add-student',{
            messages:req.flash()
        });
        /*res.render("/admin/director", {
            err1_msg: "Teacher has been saved successfully!"
        });*/
        res.redirect("/students");
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
/*director_edit_student */

const director_edit_student = async (req, res) => {
    try {
      const { INE, full_name, username, birthday, selected_birthplace, email, password} = req.body;
  
      // Create an update object to store the values of data passing by body to ensures that only modified data are sent to the update query
      const updateObject = {};
        if (INE) updateObject.full_name = INE;
        if (full_name) updateObject.full_name = full_name;
        if (username) updateObject.username = username;
        if (birthday) updateObject.city = birthday;
        if (selected_birthplace) updateObject.tele = selected_birthplace;
        if (email) updateObject.email = email;
        if (password) updateObject.email = password;
  
      
      await AddStudent.findByIdAndUpdate(req.params.id, updateObject);
  
      
      res.redirect("/Students");
    } catch (error) {
      console.log(error);
    }
};

// director_editStudent_with_ID
const director_edit_student_id = async (req, res) => {
    try {
        const studentinfo = await AddStudent.findOne({ _id: req.params.id });

        res.render("admin/edit-student", {
            studentinfo,
            title: "تحديث تلميد(ة)"
            
        });
    } catch (error) {
        console.log(error);
    }
};


// director_delete_student
const director_delete_student = async (req, res) => {
    try {
        await AddStudent.deleteOne({ _id: req.params.id });
        res.redirect("/Students");
    } catch (error) {
        console.log(error);
    }
};


/*-------------------  director_room ------------ */

 /*director_room  pour get view form */

const director_Add_Room = async (req, res) => {
    try {
        res.render("admin/add-room", {
            title: "إضافة قاعة(ة)",
        });
    } catch (error) {
        console.log(error);
    }
};


 /*add_room  methode post store une bd */
 const director_add_room = async (req, res) => {

    try {
        const {
            name_room, capacity_room, selected_dispo_room, equipement_room } = req.body;

       

    
        const newRoom = AddRoom({
            name_room, capacity_room, selected_dispo_room, equipement_room });

        await AddRoom.create(newRoom);
        req.flash("success","Room has been saved successfully!");
        res.redirect("/rooms");
  
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

  /*get All Rooms*/
  const director_getRooms = async (req, res) => {
    try {
        const Rooms = await AddRoom.find().sort({ createdAt: -1 });
        res.render("admin/Rooms", {
            title: "القاعة",
            Rooms,
           
        });
       
    } catch (error) {
        console.log(error);
    }
};




/*director_edit_Room */

const director_edit_room = async (req, res) => {
    try {
      const {name_room, capacity_room, selected_dispo_room, equipement_room } = req.body;
  
      // Create an update object to store the values of data passing by body to ensures that only modified data are sent to the update query
      const updateObject = {};
        if (name_room) updateObject.name_room =name_room ;
        if (capacity_room) updateObject.capacity_room  =capacity_room ;
        if (selected_dispo_room) updateObject.selected_dispo_room =selected_dispo_room ;
        if (equipement_room) updateObject.equipement_room  =equipement_room ;
        
      
      await  AddRoom.findByIdAndUpdate(req.params.id, updateObject);
      
  
      
     
      
      res.redirect("/admin/rooms");
    } catch (error) {
      console.log(error);
    }
};

// director_editRoom_with_ID get view
const director_edit_room_id = async (req, res) => {
    try {
        const rooms = await AddRoom.findOne({ _id: req.params.id });

        res.render("admin/Edit-Room", {
            rooms,
            title: "تحديث قاعة(ة)"
            
        });
    } catch (error) {
        console.log(error);
    }
};

// director_delete_room
const director_delete_room= async (req, res) => {
    try {
        await AddRoom.deleteOne({ _id: req.params.id });
        res.redirect("/rooms");
    } catch (error) {
        console.log(error);
    }
};



//search
const director_serach= async (req, res) => {
    try {
        const searchTtext = req.body.searchTtext ;
           const  result =  await AddRoom.find({$or : [{name_room:searchTtext}] });

      res.render("admin/search",
       {title:"search",
        arr:result,
        
       } 
      )
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
      /*crud student*/ 
      director_add_student,
    director_getStudent,
    director_Add_Student,
    director_edit_student,
    director_edit_student_id,
    director_delete_student,
  /*crud room*/ 
    director_Add_Room,
    director_add_room,
    director_getRooms ,
    director_edit_room ,
    director_edit_room_id,
    director_delete_room,
    /*director_serach*/ 
    director_serach,

    notFound,
    director_logout,
    
};
