const Notification = require('../models/Notification');

exports.createNotification = async (req, res, next) => {
  const { user, message } = req.body;
  try {
    const notification = new Notification({ user, message });
    await notification.save();
    res.json(notification);
  } catch (err) {
    next(err);
  }
};

exports.getNotifications = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const notifications = await Notification.find({ user: userId }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (err) {
    next(err);
  }
};
