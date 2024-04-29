const express = require("express");
const multer = require("multer");
const userController = require("../controllers/userController");
const authenticated = require("../middleware/authenticated");
const { userImageValidation } = require("../validation/userImageValidation");

// Set up storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/");
  },
  filename: (req, file, cb) => {
    const ext = file.originalname.split(".").pop();
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + ext);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});

module.exports = (io) => {
  const router = express.Router();

  router.get("/api/users", authenticated, (req, res) =>
    userController.index(req, res, io)
  );

  router.put(
    "/api/users",
    authenticated,
    upload.single("pictureImage"),
    userImageValidation,
    (req, res) => userController.update(req, res, io)
  );

  return router;
};
