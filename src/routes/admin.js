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
 *  * Not Found
 */
router.use(directorController.notFound);


/**
 * GET /
 * Admin - Logout
 */
router.get("/logout", directorController.director_logout);

module.exports = router;
