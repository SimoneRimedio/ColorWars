const express = require("express");
const { Server } = require("ws");
const { join } = require("path");
const { handleConnection } = require("./server/websocketHandlers");

const PORT = 3000;

const app = express();
const ws_server = new Server({ port: PORT });

app.get("/", (req, res) => {
  app.use(express.static(join(dirname, "client/css")));
  app.use(express.static(join(dirname, "client/utils")));
  res.sendFile(join(__dirname, "client", "index.html"));
});

ws_server.on("connection", (ws) => {
  handleConnection(ws, ws_server);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
