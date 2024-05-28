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

    createdAt: { type: Date, default: Date.now },
});


module.exports = mongoose.model("Module", ModuleSchema);