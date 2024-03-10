const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const AddTeacherSchema = new Schema({
    CIN: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    full_name: {
        type: String,
    },
    // confirm_password: {
    //     type: String,
    //     required: true,
    // },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    selected_level: {
        type: String,
        enum: ["إعدادي", "ثانوي"],
        required: true,
    },
    selected_subject: {
        type: String,
        enum: [
            "اللغة العربية (Arabic Language)",
            "اللغة الفرنسية (French Language)",
            "اللغة الإنجليزية (English Language)",
            "اللغة الإسبانية (Spanish Language)",
            "اللغة الألمانية (German Language)",
            "الرياضيات (Mathematics)",
            "الفيزياء (Physics)",
            "الكيمياء (Chemistry)",
            "الأحياء (Biology)",
            "الجغرافيا (Geography)",
            "التربية الإسلامية (Islamic Education)",
            "الفلسفة (Philosophy)",
            "ألتربية التشكيلية (Art education)",
            "المعلوميات (Informatique)",
            "التكنولوجيا (technology)",
        ],
        required: true,
    },
    createdAt: { type: Date, default: Date.now },
});
AddTeacherSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

module.exports = mongoose.model("AddTeacher", AddTeacherSchema);
