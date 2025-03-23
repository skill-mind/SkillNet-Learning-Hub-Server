const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notificationController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.post('/', verifyToken, notificationController.createNotification);

router.get('/:userId', verifyToken, notificationController.getNotifications);

module.exports = router;
