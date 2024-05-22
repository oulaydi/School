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
    selected_module :{
        type: String,
        required: true,
    },
    selected_room :{
        type: String,
        required: true,
    },
    selected_group :{
        type: String,
        required: true,
    },


    createdAt: { type: Date, default: Date.now },
});


module.exports = mongoose.model("Schedule", ScheduleSchema);