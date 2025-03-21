const express = require('express');
const router = express.Router();
const assignmentController = require('../controllers/assignmentController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.post('/', verifyToken, assignmentController.submitAssignment);

module.exports = router;
