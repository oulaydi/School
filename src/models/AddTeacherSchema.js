const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const AddTeacherSchema = new Schema({
    CIN: {
        type: String,
        required: true,
       // unique: true,
    },
    full_name: {
        type: String,
        required: true,
    },
    birthday: {
        type: String,
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
       // unique :true,
    },
    password: {
        type: String,
        required: true,
    },
    
   // confirm_password: {
     //    type: String,
       //  required: true,
    // },

   // selected_subject :{
    // type: Schema.Types.ObjectId,
     //    ref: 'Subject',
   //},
    
    createdAt: { type: Date, default: Date.now },
});
AddTeacherSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

module.exports = mongoose.model("AddTeacher", AddTeacherSchema);
