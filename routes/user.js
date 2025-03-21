// routes/user.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { verifyToken } = require('../middlewares/authMiddleware');


router.get('/:userId', verifyToken, userController.getProfile);
router.put('/:userId', verifyToken, userController.updateProfile);

router.post('/:userId/save-course', verifyToken, userController.saveCourse);


router.post('/enroll', verifyToken, userController.enrollCourse);


router.put('/progress', verifyToken, userController.updateCourseProgress);

module.exports = router;
