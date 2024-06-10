const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const GradesSchema = new Schema({
    name_seance: 
        [{
            type: String,
            required: true,
            username: {
                type: String,
                required: true,
            },
            attendance: {
                type: String,
                enum: ["Present", "Absent"],
                required: true
              },
        }],
    
    
   
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Grade", GradesSchema);