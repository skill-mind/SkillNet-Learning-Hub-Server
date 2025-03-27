const Course = require("../models/Course");
const upload = require("../middlewares/uploadMiddleware");

exports.createCourse = async (req, res, next) => {
  try {
    
    const videoFiles =
      req.files?.map((file) => ({
        filename: file.filename,
        path: `/uploads/videos/${file.filename}`,
      })) || [];

    const newCourse = await Course.create({
      title: req.body.title,
      description: req.body.description,
      tutor: req.userId,
      videos: videoFiles,
    });

    res.status(201).json({
      ...newCourse._doc,
      videos: videoFiles, 
    });
  } catch (err) {
    next(err);
  }
};

exports.getCourses = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const courses = await Course.find()
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });
    const total = await Course.countDocuments();
    res.json({ courses, total, page, pages: Math.ceil(total / limit) });
  } catch (err) {
    next(err);
  }
};

exports.updateCourse = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const updatedCourse = await Course.findByIdAndUpdate(courseId, req.body, {
      new: true,
    });
    if (!updatedCourse) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.json(updatedCourse);
  } catch (err) {
    next(err);
  }
};

exports.deleteCourse = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const deletedCourse = await Course.findByIdAndDelete(courseId);
    if (!deletedCourse) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.json({ message: "Course deleted successfully" });
  } catch (err) {
    next(err);
  }
};

exports.getCourseById = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.courseId).populate(
      "tutor",
      "email"
    );
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.json(course);
  } catch (err) {
    next(err);
  }
};
