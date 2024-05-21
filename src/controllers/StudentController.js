const AddStudent = require("../models/StudenteSchema");

//GET USER PROFILE
const  student_edit = async (req, res) => {
    try {
     const studentInfo  = await AddStudent.findById(req.params.id).select("-password")
    // if(!student){
     //  return res.json({message:"NOT FOUND"})
        
     //}
     res.render("profile", {
        studentInfo,
        
        title: "تحديث حسابي(ة)"
        
    });
    } catch (error) {
      console.log(error);
    }
  };
  
// student_edit_with_id

const student_edit_id = async (req, res) => {
  try {
    const { full_name, username, city ,tele, email,  } = req.body;

    // Create an update object to store the values of data passing by body to ensures that only modified data are sent to the update query
    const updateObject = {};
  
    if (full_name) updateObject.full_name = full_name;
    if (username) updateObject.username = username;
    if (city) updateObject.city = city;
    if (tele) updateObject.tele = tele;
    if (email) updateObject.email = email;

    
    await AddStudent.findByIdAndUpdate(req.params.id, updateObject);

    
    res.redirect("/director");
  } catch (error) {
    console.log(error);
  }
};

  module.exports = {
    student_edit_id,
    student_edit,
    student_edit_id,
};



  
  
