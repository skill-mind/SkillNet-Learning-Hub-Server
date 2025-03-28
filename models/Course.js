const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  title: String,
  description: String,
  tutor: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  isPaid: { type: Boolean, default: false },
  price: { type: Number, default: 0 },
  videos: [
    {
      title: String,
      filename: String,
      path: String,
      uploadDate: { type: Date, default: Date.now },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Course", CourseSchema);
