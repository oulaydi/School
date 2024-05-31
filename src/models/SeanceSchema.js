const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const SeanceSchema = new Schema({
    name_seance: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        //unique :true,
    },
    name_module: {
        type: String,
        required: true,
     //   unique: true,
    },
    name_group: {
        type: String,
        required: true,
       // unique: true,
    },
        
    createdAt: { type: Date, default: Date.now },
});


module.exports = mongoose.model("Seance", SeanceSchema);