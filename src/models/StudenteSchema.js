const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const AddStudentSchema = new Schema({
    CIN: {
        type: String,
        required: true,
        unique: true,
    },
    full_name: {
        type: String,
    },
    full_name: {
        type: String,
    },
   
    city: {
        type: String,
        required: true,
    },
    Tele: {
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
    
   //  confirm_password: {
        // type: String,
        // required: true,
    //},
    
    
    
    createdAt: { type: Date, default: Date.now },
});



module.exports = mongoose.model("AddStudent", AddStudentSchema);
