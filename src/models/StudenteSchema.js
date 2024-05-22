const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


const Schema = mongoose.Schema;

const AddStudentSchema = new Schema({
    INE: {
        type: String,
        required: false,
        unique: true,
    },
    full_name: {
        type: String,
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
    selected_birthplace: {
        type: String,
        required :false,
        enum:[
            "الدار البيضاء",
            " فاس",
            "الرباط",
            " مراكش",
            " طنجة ",
            " أكادير",
        ]
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
