const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const CourSchema = new Schema({
    name_cour:{
        type: String ,
        require:true,
        unique:true
    },
    module:{
        type: String,
        require:true
    } ,file :{
        type: String,
        require:true
    },filePath: {
        type: String }
     
});


module.exports = mongoose.model('Cour',CourSchema);