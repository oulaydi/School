const DirectorSchema = require("../models/DirectorSchema");
const AddTeacher = require("../models/AddTeacherSchema");
const AddStudent = require("../models/StudenteSchema");
const AddSubject = require("../models/SubjectSchema");
const AddGroup = require("../models/GroupSchema");
const AddModule = require("../models/ModuleSchema");
const AddRoom = require("../models/RoomSchema");
const AddSchedule= require('../models/ScheduleSchema');
const AddSeance = require('../models/SeanceSchema');
const AddCour = require('../models/CourSchema');

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
                res.redirect("/dashboard");  // change the path, was /director
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
        const countCour = await AddCour.countDocuments();
        const countStudent = await AddStudent.countDocuments();
        const countModule = await AddModule.countDocuments();
        const director = await DirectorSchema.findOne({},"username");
        console.log(director)
        const teachers = await AddTeacher.find().sort({ createdAt: -1 });
       
        res.render("admin/dashboard", { // change the path, was /director
            title: "الرئيسية - لوحة القيادة",
            teachers,
            countCour,
            countStudent,
            countModule,
            director,
        });
       
    } catch (error) {
        console.log(error);
    }
};

// teachers index
const teacher_index = async (req, res) => {
    try {
        const teachers = await AddTeacher.find().sort({ createdAt: -1 });
        res.render("admin/directorAddTeacher", { // change the path, was /director
            title: "الرئيسية - لوحة القيادة",
            teachers,
           
        });
       
    } catch (error) {
        console.log(error);
    }
};

// const teacher_index2 = async (req, res) => {
//     try {
//         const teachers = await AddTeacher.find().sort({ createdAt: -1 });
//         res.render("admin/Teachers", { // change the path, was /director
//             title: "الرئيسية - لوحة القيادة",
//             teachers,
           
//         });
       
//     } catch (error) {
//         console.log(error);
//     }
// };

// director_add
const director_add = async (req, res) => {
    try {
        const {
            CIN,
            name_professeur,
            birthday,
            birthplace,
            num_tel,
            email,
            username,
            password,
            confirm_password,
            specialite,

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
            name_professeur,
            birthday,
            birthplace,
            num_tel,
            email,
            username,
            password,
            confirm_password,
            specialite,
        });

        await AddTeacher.create(newTeacher);
        req.flash("success","Teacher has been saved successfully!");
        res.render('admin/Teachers',{
            title: "الرئيسية - لوحة القيادة",
            messages:req.flash()
        });
        /*res.render("/admin/director", {
            err1_msg: "Teacher has been saved successfully!"
        });*/
        res.redirect("/teachers");
        
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
      const {CIN,name_professeur,birthday,birthplace,num_tel,email,username,specialite } = req.body;
  
      // Create an update object to store the values of data passing by body to ensures that only modified data are sent to the update query
      const updateObject = {};
      if (CIN) updateObject.CIN = CIN;
      if (name_professeur) updateObject.name_professeur = name_professeur;
      if (specialite) updateObject.specialite = specialite;  
      if (username) updateObject.username = username;
      if (birthday) updateObject.birthday = birthday;
      if (birthplace) updateObject.birthplace = birthplace;
      if (num_tel) updateObject.num_tel = num_tel;
      if (email) updateObject.email = email;
  
      
      await AddTeacher.findByIdAndUpdate(req.params.id, updateObject);
  
      
      res.redirect("/teachers");
    } catch (error) {
      console.log(error);
    }
  };

// director_edit_with_ID
const director_edit_id = async (req, res) => {
    try {
        const rooms = await AddRoom.find();
        const subjects = await AddSubject.find({}, 'name_subject');
        const teacherInfo = await AddTeacher.findOne({ _id: req.params.id }) .select('-password');
        res.render("admin/edit-teacher", {
            teacherInfo,
            title: "تحديث استاذ(ة)",
            subjects, 
            rooms,
            
        });
    } catch (error) {
        console.log(error);
    }
};

// director_delete
const director_delete = async (req, res) => {
    try {
        await AddTeacher.deleteOne({ _id: req.params.id });
        res.redirect("/teachers");
    } catch (error) {
        console.log(error);
    }
};



/* director_student  */
    /*getAllStudent*/
const director_getStudent = async (req, res) => {
    try {
        const Students = await AddStudent.find().sort({ createdAt: -1 });
        res.render("admin/students", {
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
        res.render("/admin/add-student", {
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
            INE, name_student, username, birthday, birthplace,num_tel ,email, password,name_group,confirm_password } = req.body;

        // Hash the password before saving to MongoDB (you can use bcrypt or any other hashing library)
        //const hashedPassword = await bcrypt.hash(password, 10);
        const newStudent = AddStudent({
            INE, name_student, username, birthday, birthplace,num_tel ,email, password,name_group,confirm_password});

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
      const { INE, name_student, username, birthday, birthplace,num_tel ,email, password,name_group,confirm_password } = req.body;
  
      // Create an update object to store the values of data passing by body to ensures that only modified data are sent to the update query
      const updateObject = {};
        if (INE) updateObject.INE = INE;
        if (name_student) updateObject.name_student = name_student;
        if (username) updateObject.username = username;
        if (birthday) updateObject.city = birthday;
        if (birthplace) updateObject.birthplace = birthplace;
        if (num_tel) updateObject.num_tel = num_tel;
        if (email) updateObject.email = email;
        if (name_group) updateObject.name_group = name_group;
        if (password) updateObject.email = password;
        if (confirm_password) updateObject.confirm_password = confirm_password;
  
      await AddStudent.findByIdAndUpdate(req.params.id, updateObject);

      res.redirect("/Students");
    } catch (error) {
      console.log(error);
    }
};

// director_editStudent_with_ID
const director_edit_student_id = async (req, res) => {
    try {
        const groups = await AddGroup.find({}, 'name_group');
        const studentinfo = await AddStudent.findOne({ _id: req.params.id }).select("-password");
        res.render("admin/edit-student", {
            studentinfo,
            title: "تحديث تلميد(ة)",           
            groups,
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
/********************Module***********************/
// director_creat_module
const director_add_module = async (req, res) => {
    try {
        const { name_module, desc_module, selected_semester} = req.body;

        await AddModule.create({
            name_module,
            desc_module,
            selected_semester,
        });

        req.flash("success", "Module has been saved successfully!");
        res.redirect('/Module');
    } 
    catch (error) {
        // const teachers = await AddTeacher.find({}, 'full_name');
         console.log(error);
        // req.flash("error", "An error occurred while saving the module.");
        // res.render('admin/add-Module', {
        //     title: "تحديث تلميد(ة)",
        //     teachers,
        //     messages: req.flash()
        // });
    }
};
// director_add_module
const director_getModule = async (req,res)=>{
    const teachers =   await AddTeacher.find().sort({createdAt:-1});
    try{
        res.render('admin/add-Module',{
        title: "الفضاء الخاص - الاداره",
        teachers,
        messages: req.flash()
        }
        );
    }catch(error){
          console.log(error);
          
    }
}

// // director Module index 
const Module_index = async (req,res)=>{
    try{
     const Modules = await AddModule.find().sort({createdAt:-1});
     res.render('admin/Module', {
        title: "إضافة تلميد(ة)",
        Modules}
     );
    }catch(error){
         console.log(error);
    }
}
// director_edit_module with id
const director_edit_modules_id = async (req,res)=>{
    try{
    const ModuleInfo = await AddModule.findById({_id:req.params.id});
        res.render('admin/edit-Module',
         { ModuleInfo,
            title : "إضافة تلميد(ة)",
    });
    }catch(error){
        console.log(error);

    }
}
// director_edit_module
const director_edit_modules = async (req,res)=>{
    try{
        const { name_module, desc_module, selected_semester} = req.body;

        updateObject={};
        if(name_module) updateObject.name_module=name_module;
        if(desc_module) updateObject.desc_module=desc_module;
        if(selected_semester) updateObject.selected_semester=selected_semester;

        await AddModule.findByIdAndUpdate(req.params.id,updateObject);
        res.redirect('/Module');
    }catch(error){
        console.log(error);
    }
}
// director_Delete_module by id
const director_delete_modules = async (req,res)=>{
    try{
         await AddModule.findByIdAndDelete({ _id:req.params.id });
        res.redirect("/Module")
    }catch(error){
        console.log(error);
    }
}

/* director_subject  */

/*add_subjectt  pour get view form */
const director_Add_Subject = async (req, res) => {
    try {
        res.render("admin/add-subject", {
            title: "إضافة تلميد(ة)",
        });
    } catch (error) {
        console.log(error);
    }
};


/*add_subject  methode post store une bd */
const director_add_subject = async (req, res) => {
    try {
        const {
            name_subject, desc_subject, id_subject } = req.body;

        // Hash the password before saving to MongoDB (you can use bcrypt or any other hashing library)
        //const hashedPassword = await bcrypt.hash(password, 10);
        const newSubject = AddSubject({
            name_subject, desc_subject, id_subject});

        await AddSubject.create(newSubject);
        req.flash("success","subject has been saved successfully!");
        res.render('admin/add-subject',{
            messages:req.flash()
        });
        /*res.render("/admin/director", {
            err1_msg: "Teacher has been saved successfully!"
        });*/
       res.send('add Subject successully')
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

/*director_get_all_subjects*/

const director_getSubjects = async (req, res) => {
    try {
        const Subjects = await AddSubject.find().sort({ createdAt: -1 });
        res.render("admin/Subjects", {
            title: "الثلاميد",
            Subjects,
        });
       
    } catch (error) {
        console.log(error);
    }
};

/*director_edit_subject */

const director_edit_subject = async (req, res) => {
    try {
      const { name_subject, desc_subject, id_subject} = req.body;
  
      // Create an update object to store the values of data passing by body to ensures that only modified data are sent to the update query
      const updateObject = {};
        if (name_subject) updateObject.name_subject = name_subject;
        if (desc_subject) updateObject.desc_subject = desc_subject;
        if (id_subject) updateObject.id_subject = id_subject;
        
      await AddSubject.findByIdAndUpdate(req.params.id, updateObject);
      
      res.redirect("/Subjects");
    } catch (error) {
      console.log(error);
    }
};

// director_editStudent_with_ID
const director_edit_subject_id = async (req, res) => {
    try {
        const subjectinfo = await AddSubject.findOne({ _id: req.params.id });
        res.render("admin/edit-subject", {
            subjectinfo,
            title: "تحديث تلميد(ة)"
        });
    } catch (error) {
        console.log(error);
    }
};
// director_delete_subject
const director_delete_subject = async (req, res) => {
    try {
        await AddSubject.deleteOne({ _id: req.params.id });
        res.redirect("/Subjects");
    } catch (error) {
        console.log(error);
    }
};

/*director group*/

/*add_group  pour get view form */
const director_Add_group = async (req, res) => {
    try {
        res.render("/admin/add-group", {
            title: "إضافة تلميد(ة)",
            subjects
        });
    } catch (error) {
        console.log(error);
    }
};

/*add_group  methode post store une bd */
const director_add_group = async (req, res) => {
    try {

        const {
            name_group, selected_level,selected_saison,capacity_group,name_subject } = req.body;
            

        // Hash the password before saving to MongoDB (you can use bcrypt or any other hashing library)
        //const hashedPassword = await bcrypt.hash(password, 10);
        const newGroup = AddGroup({
            name_group, selected_level, selected_saison,capacity_group,name_subject});

        await AddGroup.create(newGroup);
        req.flash("success","Group has been saved successfully!");
        res.render('admin/add-group',{
          
            messages:req.flash()
        });
        /*res.render("/admin/director", {
            err1_msg: "Teacher has been saved successfully!"
        });*/
       res.redirect('/Groups')
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

/*director_get_all_groups*/

const director_getGroups = async (req, res) => {
    try {
        const subjects = await AddSubject.find({}, 'name_subject');
        const Groups = await AddGroup.find().sort({ createdAt: -1 });
        res.render("admin/Groups", {
            title: "الثلاميد",
            Groups,
            subjects
        });
       
    } catch (error) {
        console.log(error);
    }
};

const director_getGroupsTeachers = async (req, res) => {
    try {
        const subjects = await AddSubject.find({}, 'name_subject');
        const Groups = await AddGroup.find().sort({ createdAt: -1 });
        res.render("admin/GroupTeachers", {
            title: "الثلاميد",
            Groups,
            subjects
        });
       
    } catch (error) {
        console.log(error);
    }
};

/*director_edit_Group */

const director_edit_group = async (req, res) => {
    try {
      const { name_group, selected_level, selected_saison,capacity_group,name_subject} = req.body;
  
      // Create an update object to store the values of data passing by body to ensures that only modified data are sent to the update query
      const updateObject = {};
        if (name_group) updateObject.name_group = name_group;
        if (selected_level) updateObject.selected_level = selected_level;
        if (selected_saison) updateObject.selected_saison = selected_saison;
        if (capacity_group) updateObject.capacity_group = capacity_group;
        if (name_subject) updateObject.name_subject = name_subject;

      await AddGroup.findByIdAndUpdate(req.params.id, updateObject);
      
      res.redirect("/Groups");
    } catch (error) {
      console.log(error);
    }
};

// director_editGroup_with_ID
const director_edit_group_id = async (req, res) => {
    try {
        const subjects = await AddSubject.find({}, 'name_subject');
        const groupinfo = await AddGroup.findOne({ _id: req.params.id });
        res.render("admin/edit-group", {
            groupinfo,
            title: "تحديث تلميد(ة)",
            subjects
        });
    } catch (error) {
        console.log(error);
    }
};

// director_delete_group 
const director_delete_group = async (req, res) => {
    try {
        await AddGroup.deleteOne({ _id: req.params.id });
        res.redirect("/groups");
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
      
      res.redirect("/rooms");

    } catch (error) {
      console.log(error);
    }
};

// director_editRoom_with_ID get view
const director_edit_room_id = async (req, res) => {
    try {
        const rooms = await AddRoom.findOne({ _id: req.params.id });

        res.render("admin/edit-Room", {
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


/******Schedule******/

/*AddSchedule  pour get view form */
const director_Add_Schedule = async (req, res) => {
    try {
        const rooms = await AddRoom.find({}, 'name_room'); 
        const groups = await AddGroup.find({}, 'name_group');
        const modules = await AddModule.find({}, 'name_module');
        const sences = await AddSeance.find({}, 'name_seance');
        res.render("admin/add-schedule", {
            title: "إضافة تلميد(ة)",
            rooms,
            groups,
            modules,
            sences,
        });
    } catch (error) {
        console.log(error);
    }
};

/*AddSchedule  methode post store une bd */
const director_add_schedule = async (req, res) => {
    try {
        const {
            selected_Hour, selected_day,selected_room,name_seance } = req.body;

        // Hash the password before saving to MongoDB (you can use bcrypt or any other hashing library)
        //const hashedPassword = await bcrypt.hash(password, 10);
        const newSchedule = AddSchedule({
            selected_Hour, selected_day,selected_room,name_seance});

        await AddSchedule.create(newSchedule);
        req.flash("success","Schedule has been saved successfully!");
        res.render('admin/add-schedule',{
            messages:req.flash()
        });
        /*res.render("/admin/director", {
            err1_msg: "Teacher has been saved successfully!"
        });*/
       res.redirect('/Schedules')
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

/*director_get_all_schedule*/

const director_getSchedules = async (req, res) => {
    try {
        const rooms = await AddRoom.find({}, 'name_room'); 
        const Schedules = await AddSchedule.find().sort({ createdAt: -1 });
        res.render("admin/Schedules", {
            title: "الثلاميد",
            Schedules,
            rooms,
        });
       
    } catch (error) {
        console.log(error);
    }
};


/*director_edit_Group */

const director_edit_schedule = async (req, res) => {
    try {
        
      const { selected_Hour, selected_day, selected_room,name_seance} = req.body;
  
      // Create an update object to store the values of data passing by body to ensures that only modified data are sent to the update query
      const updateObject = {};
        if (selected_Hour) updateObject.selected_Hour = selected_Hour;
        if (selected_day) updateObject.selected_day = selected_day;
        if (name_seance) updateObject.name_seance = name_seance;
        if (selected_room) updateObject.selected_room = selected_room;
        
      await AddSchedule.findByIdAndUpdate(req.params.id, updateObject);
      
      res.redirect("/Schedules");
    } catch (error) {
      console.log(error);
    }
};

// director_editSchedule_with_ID
const director_edit_schedule_id = async (req, res) => {
    try {
        const sences = await AddSeance.find({}, 'name_seance');
        const rooms = await AddRoom.find({}, 'name_room'); 
        const scheduleinfo = await AddSchedule.findOne({ _id: req.params.id });
        res.render("admin/edit-schedule", {
            scheduleinfo,
            title: "تحديث تلميد(ة)",
            rooms,
            sences,
        });
    } catch (error) {
        console.log(error);
    }
};

// director_delete_schedule 
const director_delete_schedule = async (req, res) => {
    try {
        await AddSchedule.deleteOne({ _id: req.params.id });
        res.redirect("/Schedules");
    } catch (error) {
        console.log(error);
    }
};


//getSubjects depuis mongoose


//getSubjects depuuis mongoose
const getSubjects = async (req, res) => {
    try {
        const subjects = await AddSubject.find({}, 'name_subject'); // Récupère uniquement le champ name_subject
        res.render('admin/add-group',
        {  
            title: "إضافة تلميد(ة)",
            subjects 
        }
    ); // Passe les sujets à la vue
    } catch (error) {
        res.status(500).send({ message: 'Error retrieving subjects' });
    }
};

//getSubjects depuuis mongoose
const getSubjects_Teacher = async (req, res) => {
    try {
        const subjects = await AddSubject.find({}, 'name_subject'); // Récupère uniquement le champ name_subject
        res.render('admin/add-teacher',
        {  
            title: "إضافة تلميد(ة)",
            subjects 
        }
    ); // Passe les sujets à la vue
    } catch (error) {
        res.status(500).send({ message: 'Error retrieving subjects' });
    }
};

//getGroups depuuis mongoose
const getGroupsStudents = async (req, res) => {
    try {
        const groups = await AddGroup.find({}, 'name_group'); // Récupère uniquement le champ name_group
        res.render('admin/add-student',
        {  
            title: "إضافة تلميد(ة)",
            groups,
        }
    ); // Passe les sujets à la vue
    } catch (error) {
        res.status(500).send({ message: 'Error retrieving subjects' });
    }
};

const getGroupsSeance = async (req, res) => {
    try {
        const groups = await AddGroup.find({}, 'name_group'); // Récupère uniquement le champ name_group
        res.render('admin/add-seance',
        {  
            title: "إضافة تلميد(ة)",
            groups,
        }
    ); // Passe les sujets à la vue
    } catch (error) {
        res.status(500).send({ message: 'Error retrieving subjects' });
    }
};

/*getGroups for Schedule */
const getTeachers = async (req, res) => {
    try {
        const teachers = await AddGroup.find({}, 'name_professeur'); // Récupère uniquement le champ name_group
        res.render('admin/add-add-seance',
        {  
            title: "إضافة تلميد(ة)",
            teachers,
        }
    ); // Passe les sujets à la vue
    } catch (error) {
        res.status(500).send({ message: 'Error retrieving subjects' });
    }
};



//getRooms depuuis mongoose
const getRooms = async (req, res) => {
    try {
        const rooms = await AddRoom.find({}, 'name_room'); // Récupère uniquement le champ name_room
        res.render('admin/add-schedule',
        {  
            title: "إضافة تلميد(ة)",
            rooms,
        }
    ); // Passe les sujets à la vue
    } catch (error) {
        res.status(500).send({ message: 'Error retrieving subjects' });
    }
};

//getModules depuuis mongoose
const getModules = async (req, res) => {
    try {
        const modules = await AddModule.find({}, 'name_module'); // Récupère uniquement le champ name_module
        res.render('admin/add-seance',
        {  
            title: "إضافة تلميد(ة)",
            modules,
        }
    ); // Passe les sujets à la vue
    } catch (error) {
        res.status(500).send({ message: 'Error retrieving subjects' });
    }
};

/******Seance******/

/*AddSchedule  pour get view form */
const director_Add_Seance = async (req, res) => {
    try { 
        const groups = await AddGroup.find({}, 'name_group');
        const modules = await AddModule.find({}, 'name_module');
        const teachers = await AddTeacher.find({}, 'username');
        res.render("admin/add-seance", {
            title: "إضافة تلميد(ة)",
            groups,
            modules,
            teachers,
        });
    } catch (error) {
        console.log(error);
    }
};

/*AddSeance  methode post store une bd */
const director_add_seance = async (req, res) => {
    try {
        const {
            name_seance, username,name_module,name_group } = req.body;

        // Hash the password before saving to MongoDB (you can use bcrypt or any other hashing library)
        //const hashedPassword = await bcrypt.hash(password, 10);
        const newSeance = AddSeance({
            name_seance, username,name_module,name_group});

        await AddSeance.create(newSeance);
        req.flash("success","Seance has been saved successfully!");
        res.render('admin/add-seance',{
            messages:req.flash()
        });
        /*res.render("/admin/director", {
            err1_msg: "Teacher has been saved successfully!"
        });*/
       res.redirect('/Seances')
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

/*director_get_all_schedule*/

const director_getSeance = async (req, res) => {
    try {
        const groups = await AddGroup.find({}, 'name_group');
        const modules = await AddModule.find({}, 'name_module');
        const teachers = await AddTeacher.find({}, 'username');
        const Seances = await AddSeance.find().sort({ createdAt: -1 });
        res.render("admin/Seances", {
            title: "الثلاميد",
            Seances,
            groups,
            modules,
            teachers,
        });
       
    } catch (error) {
        console.log(error);
    }
};


/*director_edit_Group */

const director_edit_seance = async (req, res) => {
    try {
      const { name_seance, username,name_module,name_group} = req.body;
  
      // Create an update object to store the values of data passing by body to ensures that only modified data are sent to the update query
      const updateObject = {};
        if (name_seance) updateObject.name_seance = name_seance;
        if (username) updateObject.username = username;
        if (name_module) updateObject.name_module = name_module;
        if (name_group) updateObject.name_group = name_group;
        

      await AddSeance.findByIdAndUpdate(req.params.id, updateObject);
      
      res.redirect("/Seances");
    } catch (error) {
      console.log(error);
    }
};

// director_editSchedule_with_ID
const director_edit_seance_id = async (req, res) => {
    try {
        
        const groups = await AddGroup.find({}, 'name_group');
        const modules = await AddModule.find({}, 'name_module');
        const teachers = await AddTeacher.find({}, 'username');
        const seanceinfo = await AddSeance.findOne({ _id: req.params.id });
        res.render("admin/edit-seance", {
            seanceinfo,
            title: "تحديث تلميد(ة)",
            groups,
            modules,
            teachers,
            
        });
    } catch (error) {
        console.log(error);
    }
};

// director_delete_schedule 
const director_delete_seance = async (req, res) => {
    try {
        await AddSeance.deleteOne({ _id: req.params.id });
        res.redirect("/Seances");
    } catch (error) {
        console.log(error);
    }
};

//getSeance depuuis mongoose
const getSeance = async (req, res) => {
    try {
        const seances = await AddSubject.find({}, 'name_seance'); // Récupère uniquement le champ name_subject
        res.render('admin/add-schedule',
        {  
            title: "إضافة تلميد(ة)",
            seances, 
        }
    ); // Passe les sujets à la vue
    } catch (error) {
        res.status(500).send({ message: 'Error retrieving subjects' });
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
    teacher_index,
    director_add,
    directorAddTeacher,
    director_edit,
    director_edit_id,
    director_delete,
    teacher_index,
   // teacher_index2,
    getSubjects_Teacher,
      /*CRUD Modules*/ 
    director_add_module,
    director_getModule,
    Module_index,
    director_edit_modules,
    director_edit_modules_id,
    director_delete_modules,
      /*crud student*/ 
    director_getStudent,
    director_Add_Student,
    director_add_student,
    director_edit_student,
    director_edit_student_id,
    director_delete_student,
    getGroupsStudents,
    /*CRUD subject*/
    director_Add_Subject,
    director_add_subject,
    director_getSubjects,
    director_edit_subject,
    director_edit_subject_id,
    director_delete_subject,
    /*CRUD group */
    director_Add_group,
    director_add_group,
    director_getGroups,
    director_edit_group,
    director_edit_group_id,
    director_delete_group,
    getSubjects,

  /*crud room*/ 
    director_Add_Room,
    director_add_room,
    director_getRooms ,
    director_edit_room ,
    director_edit_room_id,
    director_delete_room,
    /*director_serach*/ 
    director_serach,

    /*CRUD Schedule */
    director_Add_Schedule,
    director_add_schedule,
    director_getSchedules,
    director_edit_schedule,
    director_edit_schedule_id,
    director_delete_schedule,
    getRooms,
    getSeance,

    /*CRUD Seance*/
    director_Add_Seance,
    director_add_seance,
    director_getSeance,
    director_edit_seance,
    director_edit_seance_id,
    director_delete_seance,
    getTeachers,
    getModules,
    getGroupsSeance,


    notFound,
    director_logout,

    
    
};


