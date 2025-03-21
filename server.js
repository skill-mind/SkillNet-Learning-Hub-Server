const express = require('express');
const mongoose = require('mongoose');
const errorHandler = require('./middlewares/errorHandler');

const authRoutes = require('./routes/auth');
const courseRoutes = require('./routes/courses');
const userRoutes = require('./routes/user');
const walletRoutes = require('./routes/wallet');
const notificationRoutes = require('./routes/notification');
const assignmentRoutes = require('./routes/assignment');
const feedbackRoutes = require('./routes/feedback');
const tutorRoutes = require('./routes/tutor');

const app = express();

app.use(express.json());

mongoose
  .connect('mongodb://localhost/learninghub', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/profile', userRoutes);
app.use('/api/wallet', walletRoutes);
app.use('/api/notification', notificationRoutes);
app.use('/api/assignment', assignmentRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/tutor', tutorRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
