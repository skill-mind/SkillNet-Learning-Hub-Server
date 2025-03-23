const Feedback = require('../models/Feedback');

exports.submitFeedback = async (req, res, next) => {
  const { course, user, rating, comment } = req.body;
  try {
    const feedback = new Feedback({ course, user, rating, comment });
    await feedback.save();
    res.json(feedback);
  } catch (err) {
    next(err);
  }
};
