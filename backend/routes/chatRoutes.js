const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chatController");
const authenticated = require("../middleware/authenticated");

router.get("/api/chats", authenticated, chatController.index);

module.exports = router;
