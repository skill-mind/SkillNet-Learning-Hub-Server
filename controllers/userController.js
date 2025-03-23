const User = require('../models/User');

exports.getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId)
      .populate('savedCourses wishlist courseProgress.course');
    res.json(user);
  } catch (err) {
    next(err);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(updatedUser);
  } catch (err) {
    next(err);
  }
};

exports.saveCourse = async (req, res, next) => {
  const { userId } = req.params;
  const { courseId, type } = req.body; 
  try {
    const user = await User.findById(userId);
    if (type === 'saved') {
      if (!user.savedCourses.includes(courseId)) {
        user.savedCourses.push(courseId);
      }
    } else if (type === 'wishlist') {
      if (!user.wishlist.includes(courseId)) {
        user.wishlist.push(courseId);
      }
    }
    await user.save();
    res.json(user);
  } catch (err) {
    next(err);
  }
};

exports.enrollCourse = async (req, res, next) => {
  const { userId, courseId } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user.courseProgress.find(cp => cp.course.toString() === courseId)) {
      user.courseProgress.push({ course: courseId, progress: 0 });
    }
    await user.save();
    res.json(user);
  } catch (err) {
    next(err);
  }
};

exports.updateCourseProgress = async (req, res, next) => {
  try {
    const { userId, courseId, progress } = req.body;
    const user = await User.findById(userId);
    const courseProg = user.courseProgress.find(cp => cp.course.toString() === courseId);
    if (!courseProg) {
      return res.status(404).json({ error: 'Enrollment not found' });
    }
    courseProg.progress = progress;
    await user.save();
    res.json(user);
  } catch (err) {
    next(err);
  }
};
