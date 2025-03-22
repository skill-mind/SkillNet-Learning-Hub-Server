const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.post('/', verifyToken, feedbackController.submitFeedback);

module.exports = router;
