const express = require("express");
const http = require("http");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const messageRoutes = require("./routes/messageRoutes");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const setupSocket = require("./config/socket-config");
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = setupSocket(server);

app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use("/public", express.static("public"));

app.get("/", (req, res) => {
  res.send("Real-Time Chat Apps!");
});

// Routes
app.use(authRoutes);
app.use(messageRoutes(io));
app.use(userRoutes(io));
app.use(chatRoutes);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = server;
