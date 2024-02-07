const express = require("express");
const messageController = require("../controllers/messageController");

module.exports = (io) => {
  const router = express.Router();

  router.post("/api/messages", (req, res) =>
    messageController.sendMessage(req, res, io)
  );

  return router;
};
