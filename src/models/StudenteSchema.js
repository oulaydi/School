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
        enum:[
            "الدار البيضاء",
            " فاس",
            "الرباط",
            " مراكش",
            " طنجة ",
            " أكادير",
        ]
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

    Group:{
         type: Schema.Types.ObjectId,
          ref: 'Group',
    },

    Group: { // Virtual field to store the retrieved name_group
        type: String,
        get: function() {
          return this.group ? this.group.name_group : undefined;
        },
      },
    
    
    
    createdAt: { type: Date, default: Date.now },
});


module.exports = mongoose.model("AddStudent", AddStudentSchema);
