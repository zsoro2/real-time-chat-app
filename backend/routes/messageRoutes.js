const express = require("express");
const messageController = require("../controllers/messageController");
const authenticated = require("../middleware/authenticated");

module.exports = (io) => {
  const router = express.Router();

  router.post("/api/messages", authenticated, (req, res) =>
    messageController.store(req, res, io)
  );

  router.get("/api/chats/:chatId/messages", authenticated, (req, res) =>
    messageController.index(req, res)
  );

  return router;
};
