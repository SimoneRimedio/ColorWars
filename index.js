const WebSocket = require("ws");
const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  let filePath = req.url === "/" ? "./public/index.html" : `./public${req.url}`;

  const extname = String(path.extname(filePath)).toLowerCase();
  const contentType = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript",
  };

  const contentTypeHeader = contentType[extname] || "application/octet-stream";

  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end("File not found!");
    } else {
      res.writeHead(200, { "Content-Type": contentTypeHeader });
      res.end(data);
    }
  });
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});

const { Server } = require("ws");

let quanti = 0;
let maxClients = 4;
let clients = [];
let colori = ["black", "green", "blue", "red"];

let timer;
let timerDuration = 60; // Durata in secondi del timer

const ws_server = new Server({ server });

function startTimer() {
  let counter = timerDuration;

  // Invia il valore iniziale del timer ai client
  broadcastTimer(counter);

  timer = setInterval(function () {
    counter--;

    // Invia il valore aggiornato del timer ai client
    broadcastTimer(counter);

    if (counter < 0) {
      clearInterval(timer);
      checkWinner();
    }
  }, 1000);
}

function broadcastTimer(seconds) {
  // Invia il valore del timer a tutti i client
  const data = JSON.stringify({ timer: seconds, tipo: "timer" });
  ws_server.clients.forEach((client) => {
    client.send(data);
  });
  // Se il timer è stato avviato, invia un messaggio "startTimer"
  if (seconds === timerDuration) {
    const startTimerData = JSON.stringify({ startTimer: true, tipo: "timer" });
    ws_server.clients.forEach((client) => {
      client.send(startTimerData);
    });
  }
}

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
  let s = "";
  for (z = 0; z < clients.length; z++) s = s + clients[z] + " ";
  console.log("clients : " + s);

  let position = {
    quanti: clients.length,
    chi: ws.id,
    tipo: 0,
  };

  let data = JSON.stringify({ position: position });
  ws_server.clients.forEach((client) => {
    client.send(data);
  });

  //--------------Disconnessione-------------------------
  ws.on("close", () => {
    for (k = 0; k < clients.length; k++) {
      if (clients[k] === ws.id) {
        clients.splice(k, 1);
      }
    }
    console.log("Client " + ws.id + " has disconnected!");
    s = "";
    for (z = 0; z < clients.length; z++) s = s + clients[z] + " ";
    console.log("clients : " + s);

    let position = {
      quanti: clients.length,
      tipo: 1,
    };
    const data = JSON.stringify({ position: position });
    ws_server.clients.forEach((client) => {
      client.send(data);
    });
  });

  //--------------Messaggio--------------------------
  ws.on("message", function (message) {
    const arriva = JSON.parse(message);

    if (arriva.startTimer) {
      startTimer();
    }

    if (arriva && arriva.manda) {
      const i = arriva.manda.pos;

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
