const express = require('express');
const router = express.Router();
const tutorController = require('../controllers/tutorController');
const { verifyToken, requireRole } = require('../middlewares/authMiddleware');

// Set course type (paid/free)
router.post('/course-type', verifyToken, requireRole('tutor'), tutorController.setCourseType);

module.exports = router;
