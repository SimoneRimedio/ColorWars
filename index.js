// index.js
const http = require("http");
const { Server } = require("ws");
const { handleRequest } = require("./server/routes");
const { handleConnection } = require("./server/websocketHandlers");

// Creazione del server HTTP
const server = http.createServer(handleRequest);

// Creazione del server WebSocket
const ws_server = new Server({ server });

ws_server.on("connection", (ws) => {
  handleConnection(ws, ws_server);
});

// Avvio del server HTTP
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
