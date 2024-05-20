const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middlewares/authMiddleware");
const directorController = require("../controllers/directorController");

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
router.get("/director", authMiddleware, directorController.director_index);

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
//admin add module view
router.get("admin/add-module", authMiddleware, (req, res) => {
    res.render("admin/add-Module", {
        title: "الفضاء الخاص - الاداره",
    });
});

//admin add room view
router.get("admin/add-room",authMiddleware, (req, res) => {
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
 * Admin - Logout
 */
router.get("/logout", directorController.director_logout);

/**
 *  * Not Found
 */
router.use(directorController.notFound);




module.exports = router;
