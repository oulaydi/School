const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const SubjectSchema = new Schema({
    name_subject: {
        type: String,
        required: true,
        unique: true,
    },
    desc_subject: {
        type: String,
        required: true,
    },

    id_subject: {
        type: String,
        required: true,
        unique: true,
    },
        
    createdAt: { type: Date, default: Date.now },
});


module.exports = mongoose.model("Subject", SubjectSchema);