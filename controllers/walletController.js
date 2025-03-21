const User = require('../models/User');

exports.getWallet = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user.wallet);
  } catch (err) {
    next(err);
  }
};

exports.addFunds = async (req, res, next) => {
  const { userId } = req.params;
  const { amount } = req.body;
  try {
    const user = await User.findById(userId);
    user.wallet.balance += amount;
    await user.save();
    res.json(user.wallet);
  } catch (err) {
    next(err);
  }
};
