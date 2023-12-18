// server.js
const WebSocket = require("ws");
const http = require("http");
const { serverFile } = require("");
const { handleConnection, handleMessage, handleClose } = require("");
const { startTimer, broadcastTimer, determineWinner } = require("");
const { addClient, removeClient } = require("");

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});

const { Server } = require("ws");
const ws_server = new Server({ server });

//------Connessione----------------------------------
ws_server.on("connection", (ws) => {
  quanti++;
  if (quanti > maxClients) {
    // Se si supera il numero massimo di client consentiti, manda un avviso al client e chiudi la connessione
    ws.send(
      JSON.stringify({
        error: "Troppi client connessi. La connessione verrà chiusa.",
      })
    );
    ws.terminate();
    quanti--;
  }

  ws.id = quanti;
  clients.push(ws.id);
  console.log("Client " + ws.id + " connected!");

  ws.send(JSON.stringify({ clientID: ws.id, tipo: "clientID" }));

  //--------------Disconnessione-------------------------
  ws.on("close", () => {
    for (k = 0; k < clients.length; k++) {
      if (clients[k] === ws.id) {
        clients.splice(k, 1);
      }
    }
    console.log("Client " + ws.id + " has disconnected!");
  });

  //--------------Messaggio--------------------------
  ws.on("message", function (message) {
    const arriva = JSON.parse(message);

    if (arriva && arriva.startTimer) {
      startTimer();

      // Invia un messaggio solo al client che ha avviato il timer
      const timerStartedData = JSON.stringify({
        timerStarted: true,
        tipo: "timer",
      });
      ws.send(timerStartedData);
    }

    if (arriva && arriva.manda && arriva.manda.pos !== undefined) {
      const i = arriva.manda.pos;

      // Aggiorna il numero di elementi posseduti dal client
      clientElements[ws.id] = clientElements[ws.id] || 0;
      clientElements[ws.id] += 1;

      let position = {
        index: i,
        colore: colori[ws.id - 1],
        chi: ws.id,
        tipo: 2,
      };
      const data = JSON.stringify({ position: position });
      ws_server.clients.forEach((client) => {
        client.send(data);
      });
    }
  });
});
