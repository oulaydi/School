const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const schoolDirectorSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    address: {
        street: String,
        city: String,
        zipCode: String,
    },
    lastUpdate: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("DirectorSchema", schoolDirectorSchema);
