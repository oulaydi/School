const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const AddStudentSchema = new Schema({
    INE: {
        type: String,
        required: true,
        unique: true,
    },
    full_name: {
        type: String,
        required: true,
    },
    birthday: {
        type: Date,
        required: true,
    },
    selected_birthplace: {
        type: String,
        required :true,
    },
    num_tel: {
        type: Number,
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
    
   //  confirm_password: {
        // type: String,
        // required: true,
    //},

    selected_group :{
         type: Schema.Types.ObjectId,
          ref: 'Group',
    },
    
    
    createdAt: { type: Date, default: Date.now },
});


module.exports = mongoose.model("AddStudent", AddStudentSchema);
