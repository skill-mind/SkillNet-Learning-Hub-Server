const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");
const upload = require("../middlewares/uploadMiddleware");
const { verifyToken } = require("../middlewares/authMiddleware");

// POST route for course creation
router.post(
  "/",
  verifyToken,
  upload.array("videos"),
  courseController.createCourse
);

// GET all courses
router.get("/", courseController.getCourses);

// Remove undefined route
// router.get("/:courseId", courseController.getCourseById);

// Keep existing update/delete routes
router.put("/:courseId", verifyToken, courseController.updateCourse);
router.delete("/:courseId", verifyToken, courseController.deleteCourse);

module.exports = router;
