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
    } 

});


module.exports = mongoose.model('Cour',CourSchema);