const Course = require('../models/Course');

exports.setCourseType = async (req, res, next) => {
  const { tutorId, courseId, isPaid, price } = req.body;
  try {
    const course = await Course.findById(courseId);
    if (course.tutor.toString() !== tutorId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }
    course.isPaid = isPaid;
    course.price = isPaid ? price : 0;
    await course.save();
    res.json(course);
  } catch (err) {
    next(err);
  }
};
