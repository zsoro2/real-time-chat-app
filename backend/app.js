const express = require("express");
const http = require("http");
const session = require("express-session");
const passport = require("passport");
const authRoutes = require("./routes/authRoutes");
const messageRoutes = require("./routes/messageRoutes");
const initializePassport = require("./config/passport-config");
const setupSocket = require("./config/socket-config");
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const io = setupSocket(server);

initializePassport(passport);

app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("Real-Time Chat Apps!");
});

// Routes
app.use(authRoutes);
app.use(messageRoutes(io));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
