const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const GroupSchema = new Schema({
    name_group: {
        type: String,
        required: true,
        unique: true,
    },
    selected_level: {
        type: String,
        required: true,
    },
    selected_saison: {
        type: String,
        required: true,
    },
    capacity_group: {
        type: String,
        required: true,
    },

    name_subject :{
        type: String,
        required: true,
   },

    createdAt: { type: Date, default: Date.now },
});


module.exports = mongoose.model("Group", GroupSchema);