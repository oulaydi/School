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
        type: Schema.Types.ObjectId,
         ref: 'Module',
    },
    selected_room :{
        type: Schema.Types.ObjectId,
        ref: 'Room',
    },
    selected_group :{
        type: Schema.Types.ObjectId,
        ref: 'Group',
    },


    createdAt: { type: Date, default: Date.now },
});


module.exports = mongoose.model("Schedule", ScheduleSchema);