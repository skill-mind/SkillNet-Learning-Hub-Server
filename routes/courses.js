const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const { verifyToken, requireRole } = require('../middlewares/authMiddleware');

router.post('/', verifyToken, requireRole('tutor'), courseController.createCourse);

// Get courses with pagination (public)
router.get('/', courseController.getCourses);

router.put('/:courseId', verifyToken, requireRole('tutor'), courseController.updateCourse);

router.delete('/:courseId', verifyToken, requireRole('tutor'), courseController.deleteCourse);

module.exports = router;
