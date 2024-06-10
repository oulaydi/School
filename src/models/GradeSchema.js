const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const GradesSchema = new Schema({
    name_module: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    grade_normal: {
        type: String,
        required: true,
    },
    grade_partiel: {
        type: String,
        required: true,
    },
    grade_final: {
        type: String,
        required: true,
    },
    grade_decision: {
        type: String,
        required: true,
    },
   
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Grade", GradesSchema);