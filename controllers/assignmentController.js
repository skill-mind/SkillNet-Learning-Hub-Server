const Assignment = require('../models/Assignment');

exports.submitAssignment = async (req, res, next) => {
  const { course, student, content } = req.body;
  try {
    const assignment = new Assignment({ course, student, content });
    await assignment.save();
    res.json(assignment);
  } catch (err) {
    next(err);
  }
};
