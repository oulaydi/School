const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


const Schema = mongoose.Schema;

const AddStudentSchema = new Schema({
    INE: {
        type: String,
        required: true,
        unique: true,
    },
    name_student: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique :true,
    },
   
    birthday: {
        type: String,
        required: true,
    },
    birthplace: {
        type: String,
        required :true,
    },
    num_tel:{
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    name_group:{
        type: String,
        required: true,
    },
    
   //  confirm_password: {
        // type: String,
        // required: true,
    //},

    
    createdAt: { type: Date, default: Date.now },
});

AddStudentSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

module.exports = mongoose.model("AddStudent", AddStudentSchema);
