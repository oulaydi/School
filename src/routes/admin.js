const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middlewares/authMiddleware");
const directorController = require("../controllers/directorController");
const Subject = require("../models/SubjectSchema");

/**
 * GET /
 * Director - Admin page
 */
router.get("/admin", directorController.loginAuth);

/**
 * POST /
 * Director - Admin check login
 */
router.post("/admin", directorController.director_login);

/**
 * GET /
 * Director - All teachers
 */
// router.get("/director", authMiddleware, directorController.director_index);
router.get("/dashboard", authMiddleware, directorController.director_index);

/**
 * Get /
 * Dashboard Route - Teahcers
 */
router.get("/add-teacher", authMiddleware, directorController.directorAddTeacher);

/**
 * POST /
 * Dashboard - Create New eahcer.
 */
router.post("/add-teacher", authMiddleware, directorController.director_add);

/**
 * GET /
 * Dashboard - Get Teahcer by ID
 */
router.get("/edit-teacher/:id", authMiddleware, directorController.director_edit_id);

/**
 * PUT /
 * Dashboard - Edit Teahcer
//  */
router.put("/edit-teacher/:id", authMiddleware, directorController.director_edit);

/**
 * DELETE /
 * Dashboard - DELETE Teahcer
//  */
router.delete("/edit-teacher/:id", authMiddleware, directorController.director_delete);

/**
 * GET /
 * Director - All student
 */
router.get("/students",authMiddleware, directorController.director_getStudent);
/**
 * Get /
 * Dashboard Route - Teahcers
 */
router.get("/add-student",authMiddleware, directorController.director_Add_Student);
/**
 * GET /
 * Director - Add student
 */
router.post("/add-student", authMiddleware, directorController.director_add_student);

/**
 * GET /
 * Dashboard - Get student by ID
 */
router.get("/edit-student/:id", authMiddleware, directorController.director_edit_student_id);

/**
 * PUT /
 * Dashboard - Edit student
//  */
router.put("/edit-student/:id", authMiddleware, directorController.director_edit_student);



/**
 * DELETE /
 * Dashboard - DELETE student
//  */
router.delete("/edit-student/:id",authMiddleware, directorController.director_delete_student);

/*************************TEST ROUTES ************************* */

/**
 * GET /
 * Director - Add Modules
 */
router.get("/admin/add-module", authMiddleware, directorController.director_getModule);
/**
 * Post /
 * Director - CREAT Modules
 */
router.post("/admin/add-module", authMiddleware, directorController.director_add_module);
/**
 * GET /
 * Director - view all  Modules
 */
router.get("/admin/Module",authMiddleware, directorController.Module_index);
/**
 * GET /
 * Director - edit by id  Modules
 */
router.get("/admin/edit-Module/:id",authMiddleware,directorController.director_edit_modules_id);
/**
 * PUT /
 * Director - edit by id  Modules
 */
router.put("/admin/edit-Module/:id",authMiddleware,directorController.director_edit_modules);
/**
 * Delete /
 * Director - delete by id  Modules
 */
router.delete("/admin/edit-Module/:id",authMiddleware,directorController.director_delete_modules);

//admin add room view
router.get("/admin/add-room",authMiddleware, (req, res) => {
    res.render("admin/add-room", {
        title: "الفضاء الخاص - الاداره",
    });
});
//admin  add-Schedule view
router.get("admin/add-Schedule",authMiddleware, (req, res) => {
    res.render("admin/add-Schedule", {
        title: "الفضاء الخاص - الاداره",
    });
});




/**
 * GET /
 *  Admin page
 */


//router.get('/add-subject',authMiddleware,(req,res)=>{

   // res.render('admin/add-subject', {
  //      title: "الفضاء الخاص - بالأساتذة",
   // });
//});s


/**
 * Get /
 * Dashboard Route - subject
 */
router.get("/add-subject",authMiddleware, directorController.director_Add_Subject);
/**
 * GET /
 * Director - Add subject
 */
router.post("/add-subject", authMiddleware, directorController.director_add_subject);
/**
 * GET /
 * Director - All subject
 */
router.get("/subjects",authMiddleware, directorController.director_getSubjects);
/**
 * GET /
 * Dashboard - Get subject by ID
 */
router.get("/edit-subject/:id", authMiddleware, directorController.director_edit_subject_id);
/**
 * PUT /
 * Dashboard - Edit subject
*/
router.put("/edit-subject/:id", authMiddleware, directorController.director_edit_subject);
/**
 * DELETE /
 * Dashboard - DELETE subject
*/
router.delete("/edit-subject/:id",authMiddleware, directorController.director_delete_subject);




// router.get("/add-grades",authMiddleware, (req, res) => {
//     res.render("admin/add-grades", {
//         title: "الفضاء الخاص - بالأساتذة",
//     });
// });



// Route pour afficher la page add-group avec les groups
 router.get('/add-group',authMiddleware, directorController.getSubjects);
 /**
 * Get /
 * Dashboard Route - Group
 */
 router.get('/add-group',authMiddleware, directorController.director_Add_group);
/**
 * GET /
 * Director - Add student
 */
 router.post('/add-group',authMiddleware,directorController.director_add_group);
/**
 * GET /
 * Director - All student
 */
 router.get("/groups",authMiddleware, directorController.director_getGroups);
/**
 * GET /
 * Dashboard - Get student by ID
 */
 router.get("/edit-group/:id", authMiddleware, directorController.director_edit_group_id);
/**
 * PUT /
 * Dashboard - Edit student
 */
 router.put("/edit-group/:id", authMiddleware, directorController.director_edit_group);
/**
 * DELETE /
 * Dashboard - DELETE student
 */
 router.delete("/edit-group/:id",authMiddleware, directorController.director_delete_group);

 

 


/**
 * GET /
 * Admin - Logout
 */
router.get("/logout", directorController.director_logout);
/**
 *  * Not Found
 */
router.use(directorController.notFound);


module.exports = router;
