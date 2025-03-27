require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const errorHandler = require("./middlewares/errorHandler");

const authRoutes = require("./routes/auth");
const courseRoutes = require("./routes/courses");
const userRoutes = require("./routes/user");
const walletRoutes = require("./routes/wallet");
const notificationRoutes = require("./routes/notification");
const assignmentRoutes = require("./routes/assignment");
const feedbackRoutes = require("./routes/feedback");
const tutorRoutes = require("./routes/tutor");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/learninghub", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api/auth", authRoutes);

// Existing routes
app.use("/api/courses", courseRoutes);
app.use("/api/profile", userRoutes);
app.use("/api/wallet", walletRoutes);
app.use("/api/notification", notificationRoutes);
app.use("/api/assignment", assignmentRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/tutor", tutorRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () =>
  console.log(`Server started on port ${PORT}`)
);

server.on("error", (err) => {
  if (err.code === "EADDRINUSE") {
    console.error(`Port ${PORT} is already in use`);
  }
});

app.use(
  "/uploads/videos",
  express.static(path.join(__dirname, "uploads/videos"))
);
