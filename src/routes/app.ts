import express from 'express';
import { courseRoutes } from '../api/v1/Course/course.routes';
import { FeedBackRoutes } from '../api/v1/Feedback/FeedBack.routes';

const app = express();

app.use('/api', courseRoutes , FeedBackRoutes);

export default app;
