const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String, // Hashed password
  role: { type: String, enum: ['student', 'tutor'], default: 'student' },
  wallet: { balance: { type: Number, default: 0 } },
  savedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  courseProgress: [
    {
      course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
      progress: Number 
    }
  ]
});

module.exports = mongoose.model('User', UserSchema);
