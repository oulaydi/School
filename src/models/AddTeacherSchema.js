const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const AddTeacherSchema = new Schema({
    CIN: {
        type: String,
        required: true,
        unique: true,
    },
    name_professeur: {
        type: String,
        required: true,
    },
    birthday: {
        type: String,
        required: true,
    },
    num_tel: {
        type: String,
        required: true,
    },
    birthplace: {
        type: String,
        required :true,
    },
    num_tel: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique :true,
    },
    password: {
        type: String,
        required: true,
    },

    // confirm_password: {
    //     type: String,
    //     required: true,
    // },

    specialite: {
        type: String,
        required: true,
    },
 
    createdAt: { type: Date, default: Date.now },
});
AddTeacherSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

module.exports = mongoose.model("AddTeacher", AddTeacherSchema);
