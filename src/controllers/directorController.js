const DirectorSchema = require("../models/DirectorSchema");
const AddTeacher = require("../models/AddTeacherSchema");
const bcrypt = require("bcrypt");
const jwtSecret = process.env.jwtSecret;
const jwt = require("jsonwebtoken");


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
        const teachers = await AddTeacher.find();

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
        try {
            const newTeacher = AddTeacher({
                CIN: req.body.CIN,
                full_name: req.body.full_name,
                password: req.body.password,
                confirm_password: req.body.confirm_password,
                username: req.body.username,
                selected_level: req.body.selected_level,
                selected_subject: req.body.selected_subject,
            });

            await AddTeacher.create(newTeacher);

            res.redirect("/director");
        } catch (error) {
            console.log(error);
        }
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
    director_login,
    director_index,
    director_add,
    director_edit,
    director_delete,
    director_logout,
};
