function setupSocket(server) {
  const { Server } = require("socket.io");

  const corsOptions = {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  };

  const io = new Server(server, {
    cors: corsOptions,
  });

  io.on("connection", (socket) => {
    console.log("a user connected");

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });

  return io;
}

module.exports = setupSocket;
