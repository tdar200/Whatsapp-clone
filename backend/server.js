const io = require("socket.io")(5000);

io.on("connection", (socket) => {
  const number = socket.handshake.query.number;
  socket.join(number);

  socket.on("send-message", ({ recipients, text }) => {
    recipients.forEach((recipient) => {
      const newRecipients = recipients.filter((r) => r !== recipient);
      newRecipients.push(number);
      socket.broadcast.to(recipient).emit("receive-message", {
        recipients: newRecipients,
        sender: number,
        text,
      });
    });
  });
});
