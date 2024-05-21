const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const RoomSchema = new Schema({
    name_room: {
        type: String,
        required: true,
        unique: true,
    },
    capacity_room: {
        type: String,
        required: true,
    },
    selected_dispo_room: {
        type: String,
        required: true,
    },
    equipement_room: {
        type: String,
        required: true,
    },
    

    createdAt: { type: Date, default: Date.now },
});


module.exports = mongoose.model("Room", RoomSchema);