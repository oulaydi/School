const DirectorSchema = require("../models/DirectorSchema");
const AddTeacher = require("../models/AddTeacherSchema");
const AddStudent = require("../models/StudenteSchema");
const AddSubject = require("../models/SubjectSchema");
const AddGroup = require("../models/GroupSchema");
const AddModule = require("../models/ModuleSchema");
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

// director_creat_module
const director_add_module = async (req, res) => {
    try {
        const { name_module, desc_module, selected_semester, selected_teacher } = req.body;

        await AddModule.create({
            name_module,
            desc_module,
            selected_semester,
            selected_teacher
        });

        req.flash("success", "Module has been saved successfully!");
        res.redirect('/admin/Module');
    } catch (error) {
        console.log(error);
        req.flash("error", "An error occurred while saving the module.");
        res.render('admin/add-Module', {
            messages: req.flash()
        });
    }
};
// director_add_module
const director_getModule = async (req,res)=>{
    try{
        res.render('admin/add-Module',{
        title: "الفضاء الخاص - الاداره",
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
        const { name_module, desc_module, selected_semester, selected_teacher } = req.body;

        updateObject={};
        if(name_module) updateObject.name_module=name_module;
        if(desc_module) updateObject.desc_module=desc_module;
        if(selected_semester) updateObject.selected_semester=selected_semester;
        if(selected_teacher) updateObject.selected_teacher=selected_teacher;

        await AddModule.findByIdAndUpdate(req.params.id,updateObject);
        res.redirect('/admin/Module');
    }catch(error){
        console.log(error);
    }
}
// director_Delete_module by id
const director_delete_modules = async (req,res)=>{
    try{
         await AddModule.findByIdAndDelete({ _id:req.params.id });
        res.redirect("/admin/Module")
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
            name_group, selected_level, selected_saison,capacity_group,selected_subject } = req.body;

        // Hash the password before saving to MongoDB (you can use bcrypt or any other hashing library)
        //const hashedPassword = await bcrypt.hash(password, 10);
        const newGroup = AddGroup({
            name_group, selected_level, selected_saison,capacity_group,selected_subject});

        await AddGroup.create(newGroup);
        req.flash("success","Group has been saved successfully!");
        res.render('admin/add-group',{
            messages:req.flash()
        });
        /*res.render("/admin/director", {
            err1_msg: "Teacher has been saved successfully!"
        });*/
       res.redirect('admin/Groups')
        
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


/*director_edit_Group */

const director_edit_group = async (req, res) => {
    try {
      const { name_group, selected_level, selected_saison,capacity_group,selected_subject} = req.body;
  
      // Create an update object to store the values of data passing by body to ensures that only modified data are sent to the update query
      const updateObject = {};
        if (name_group) updateObject.name_group = name_group;
        if (selected_level) updateObject.selected_level = selected_level;
        if (selected_saison) updateObject.selected_saison = selected_saison;
        if (capacity_group) updateObject.capacity_group = capacity_group;
        if (selected_subject) updateObject.selected_subject = selected_subject;

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
      /*CRUD Modules*/ 
    director_add_module,
    director_getModule,
    Module_index,
    director_edit_modules,
    director_edit_modules_id,
    director_delete_modules,
      /*crud student*/ 
      director_add_student,
    director_getStudent,
    director_Add_Student,
    director_add_student,
    director_edit_student,
    director_edit_student_id,
    director_delete_student,
    director_getStudent,
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
    

    notFound,
    director_logout,
    
    
};
