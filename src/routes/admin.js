const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middlewares/authMiddleware");
const directorController = require("../controllers/directorController");

/******************Admin************************/
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

/********************Teacher*********************/
/**
 * GET /
 * Director - All teachers
 */


router.get("/dashboard", authMiddleware, directorController.director_index);

//passer la valeur de name_subject dans add-teacher 
//router.get("/add-teacher", authMiddleware, directorController.getSubjects);
/* Get all teachers*/
router.get("/teachers", authMiddleware, directorController.teacher_index);

router.get("/add-teacher",authMiddleware, directorController.getSubjects_Teacher);
/**
 * Get /
 * Dashboard Route - Teahcers
 */
router.get("/add-teacher", authMiddleware, directorController.directorAddTeacher);
/**
 * POST /
 * Dashboard - Create New Teahcer.
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


/*******************Student*********************/
//passer la valeur name_group dans add-student
router.get("/add-student",authMiddleware, directorController.director_getGroups);
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

/***************Modules*************/
// passer la valeur de full_name de teacher dans add-module
router.get("/add-module", authMiddleware, directorController.getTeachers);
/**
 * GET /
 * Director - Add Modules
 */
router.get("/add-Module", authMiddleware, directorController.director_getModule);
/**
 * Post /
 * Director - CREAT Modules
 */
router.post("/add-Module", authMiddleware, directorController.director_add_module);
/**
 * GET /
 * Director - view all  Modules
 */
router.get("/Module",authMiddleware, directorController.Module_index);
/**
 * GET /
 * Director - edit by id  Modules
 */
router.get("/edit-Module/:id",authMiddleware,directorController.director_edit_modules_id);
/**
 * PUT /
 * Director - edit by id  Modules
 */
router.put("/edit-Module/:id",authMiddleware,directorController.director_edit_modules);
/**
 * Delete /
 * Director - delete by id  Modules
 */
router.delete("/edit-Module/:id",authMiddleware,directorController.director_delete_modules);


/*******************Subjcet***********************/
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


/************************Group************************/
// Route pour afficher la page add-group avec les groups
 router.get('/add-group',authMiddleware, directorController.getSubjects);
 /**
 * Get /
 * Dashboard Route - Group
 */
 router.get('/add-group',authMiddleware, directorController.director_Add_group);
/**
 * GET /
 * Director - Add Group
 */
 router.post('/add-group',authMiddleware,directorController.director_add_group);
/**
 * GET /
 * Director - All Group
 */
 router.get("/groups",authMiddleware, directorController.director_getGroups);
/**
 * GET /
 * Dashboard - Get Group by ID
 */
 router.get("/edit-group/:id", authMiddleware, directorController.director_edit_group_id);
/**
 * PUT /
 * Dashboard - Edit Group
 */
 router.put("/edit-group/:id", authMiddleware, directorController.director_edit_group);
/**
 * DELETE /
 * Dashboard - DELETE Group
 */
 router.delete("/edit-group/:id",authMiddleware, directorController.director_delete_group);

/*********Room**********/

// Route pour room---------------------------------------------------------------

router.get('/rooms',authMiddleware, directorController.director_getRooms);
/**
* Get /
* Dashboard Route - Group
*/
router.get('/add-room',authMiddleware, directorController.director_Add_Room);
/**
* GET /
* Director - Add student
*/
router.post('/add-room',authMiddleware,directorController.director_add_room);

/**
* GET /
* Dashboard - Get student by ID
*/
router.get("/edit-room/:id", authMiddleware, directorController.director_edit_room_id);
/**
* PUT /
* Dashboard - Edit student
*/
router.put("/edit-room/:id", authMiddleware, directorController.director_edit_room);
/**
* DELETE /
* Dashboard - DELETE student
*/
router.delete("/edit-room/:id",authMiddleware, directorController.director_delete_room);

/******Schedule******/

/**
 * GET /
 * Director - All Schedule
 */
router.get("/schedules",authMiddleware, directorController.director_getSchedules);
/**
 * Get /
 * Dashboard Route - Schedule
 */
router.get("/add-schedule",authMiddleware, directorController.director_Add_Schedule);
/**
 * GET /
 * Director - Add Schedule
 */
router.post("/add-schedule", authMiddleware, directorController.director_add_schedule);
/**
 * GET /
 * Dashboard - Get Schedule by ID
 */
router.get("/edit-schedule/:id", authMiddleware, directorController.director_edit_schedule_id);
/**
 * PUT /
 * Dashboard - Edit Schedule
//  */
router.put("/edit-schedule/:id", authMiddleware, directorController.director_edit_schedule);
/**
 * DELETE /
 * Dashboard - DELETE Schedule
//  */
router.delete("/edit-schedule/:id",authMiddleware, directorController.director_delete_schedule);

// passer la valeur name_room dans add-schedule
router.get("/add-schedule",authMiddleware, directorController.getRooms);
// passer la valeur name_module dans add-schedule
router.get("/add-schedule",authMiddleware, directorController.getModules);
// passer la valeur name_group dans add-schedule
router.get("/add-schedule",authMiddleware, directorController.getGroups_Schedule);

//search
router.post("/search", authMiddleware, directorController.director_serach);


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
