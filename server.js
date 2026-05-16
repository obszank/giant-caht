const WebSocket = require("ws");

const port = process.env.PORT || 3000;
const server = new WebSocket.Server({ port });

let clients = [];

server.on("connection", (ws) => {
  clients.push(ws);

  ws.on("message", (message) => {
    // Send message to all connected users
    clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message.toString());
      }
    });
  });

  ws.on("close", () => {
    clients = clients.filter(c => c !== ws);
  });
});

console.log("Server running on ws://localhost:3000");