const express = require("express");
const userController = require("../controllers/userController");
const authenticated = require("../middleware/authenticated");

module.exports = (io) => {
  const router = express.Router();

  router.get("/api/users", authenticated, (req, res) =>
    userController.index(req, res, io)
  );

  return router;
};
