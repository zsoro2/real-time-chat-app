function setupSocket(server) {
  const { Server } = require("socket.io");
  const io = new Server(server);

  io.on("connection", (socket) => {
    console.log("a user connected");

    // Handle custom events like 'joinRoom', 'sendMessage', etc.

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });

  return io;
}

module.exports = setupSocket;
