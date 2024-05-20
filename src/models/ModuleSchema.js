const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const ModuleSchema = new Schema({
    name_module: {
        type: String,
        required: true,
        unique: true,
    },
    desc_module: {
        type: String,
        required: true,
    },
    selected_semester: {
        type: String,
        required: true,
    },

    selected_teacher :{
        type: Schema.Types.ObjectId,
         ref: 'AddTeacher',
   },

    createdAt: { type: Date, default: Date.now },
});


module.exports = mongoose.model("Module", ModuleSchema);