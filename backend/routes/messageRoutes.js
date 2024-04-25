const express = require("express");
const messageController = require("../controllers/messageController");
const authenticated = require("../middleware/authenticated");
const {
  sendMessageValidationRules,
} = require("../validation/messageValidation");
const validate = require("../validation/validate");

module.exports = (io) => {
  const router = express.Router();

  router.post(
    "/api/messages",
    authenticated,
    sendMessageValidationRules(),
    validate,
    (req, res) => messageController.store(req, res, io)
  );

  router.get("/api/chats/:chatId/messages", authenticated, (req, res) =>
    messageController.index(req, res)
  );

  return router;
};
