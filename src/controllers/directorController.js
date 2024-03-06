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
            err_msg: "الرجاء تسجيل الدخول أولاً للوصول إلى لوحة التحكم"
        });
    } catch (error) {
        console.log(error);
    }
};

// director_login
const director_login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const director = await DirectorSchema.findOne({ username });
        if (!director) {
            return res.status(401).json({ message: "Invalid infos" });
        }

        const ifPwdValid = await bcrypt.compare(password, director.password);
        if (!ifPwdValid) {
            return res.status(401).json({ message: "Invalid infos" });
        }

        const adminToken = jwt.sign({ directorId: director._id }, jwtSecret);
        res.cookie("adminToken", adminToken, { httpOnly: true });

        res.redirect("/director");
    } catch (error) {
        console.log(error);
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
        // const hashedPassword = await bcrypt.hash(password, 10);

        const newTeacher = AddTeacher({
            CIN,
            full_name,
            password,
            username,
            selected_level,
            selected_subject,
        });

        await AddTeacher.create(newTeacher);

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
        await AddTeacher.findByIdAndUpdate(req.params.id, {
            CIN: req.body.CIN,
            full_name: req.body.full_name,
            password: req.body.password,
            confirm_password: req.body.confirm_password,
            username: req.body.username,
            selected_level: req.body.selected_level,
            selected_subject: req.body.selected_subject,
        });

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
            title: "تحديث استاذ(ة)",
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

module.exports = {
    loginAuth,
    director_login,
    director_index,
    director_add,
    directorAddTeacher,
    director_edit,
    director_edit_id,
    director_delete,
    director_logout,
};
