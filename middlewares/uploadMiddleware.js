const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadDir = "uploads/videos";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedExtensions = [".mp4", ".mov", ".avi", ".mkv"];
  const ext = path.extname(file.originalname).toLowerCase();
  allowedExtensions.includes(ext)
    ? cb(null, true)
    : cb(new Error("Invalid video file type"), false);
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 500 * 1024 * 1024 }, // 500MB
  fileFilter: fileFilter,
});

module.exports = upload;
