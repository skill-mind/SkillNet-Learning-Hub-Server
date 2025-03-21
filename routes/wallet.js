const express = require('express');
const router = express.Router();
const walletController = require('../controllers/walletController');
const { verifyToken } = require('../middlewares/authMiddleware');

router.get('/:userId', verifyToken, walletController.getWallet);

router.post('/:userId/add', verifyToken, walletController.addFunds);

module.exports = router;
