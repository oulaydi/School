const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const ScheduleSchema = new Schema({
    selected_Hour: {
        type: String,
        required: true,
    },
    selected_day: {
        type: String,
        required: true,
    },
    selected_room :{
        type: String,
        required: true,
    },
    name_seance :{
        type: String,
        required: true,
        unique :true,
    },

    createdAt: { type: Date, default: Date.now },
});


module.exports = mongoose.model("Schedule", ScheduleSchema);