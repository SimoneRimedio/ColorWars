// websocketHandlers.js

let quanti = 0;
let maxClients = 4;
let clients = [];
let colori = ["orange", "green", "blue", "red"];

let clientElements = {};

function handleConnection(ws, ws_server) {
  //connessione
  quanti++;
  if (quanti > maxClients) {
    ws.send(
      JSON.stringify({
        error: "Troppi client connessi. La connessione verrà chiusa.",
      })
    );
    ws.terminate();
    quanti--;
    return;
  }

  ws.id = quanti;
  clients.push(ws.id);
  console.log("Client " + ws.id + " connected!");

  let s = "";
  for (const element of clients) s = s + element + " ";
  console.log("clients : " + s);

  // Invia l'ID del client appena connesso
  ws.send(JSON.stringify({ clientID: ws.id, tipo: "clientID" }));

  let position = {
    quanti: clients.length,
    chi: ws.id,
    tipo: 0,
  };

  let data = JSON.stringify({ position: position });
  ws_server.clients.forEach((client) => {
    client.send(data);
  });

  // Disconnessione
  ws.on("close", () => {
    for (let k = 0; k < clients.length; k++) {
      if (clients[k] === ws.id) {
        clients.splice(k, 1);
      }
    }
    console.log("Client " + ws.id + " has disconnected!");
    s = "";
    for (const element of clients) s = s + element + " ";
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

  // Messaggio
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

  // gameLogic

  let timer;
  let timerDuration = 20;

  function startTimer() {
    let counter = timerDuration;

    broadcastTimer(counter);

    timer = setInterval(function () {
      counter--;

      broadcastTimer(counter);

      if (counter < 0) {
        clearInterval(timer);
        determineWinner();
      }
    }, 1000);
  }

  function broadcastTimer(seconds) {
    const data = JSON.stringify({ timer: seconds, tipo: "timer" });
    ws_server.clients.forEach((client) => {
      client.send(data);
    });

    if (seconds === timerDuration) {
      const startTimerData = JSON.stringify({
        startTimer: true,
        tipo: "timer",
      });
      ws_server.clients.forEach((client) => {
        client.send(startTimerData);
      });
    }
  }

  function determineWinner() {
    let winnerID = null;
    let maxElements = -1;

    for (const [clientID, elements] of Object.entries(clientElements)) {
      if (elements > maxElements) {
        maxElements = elements;
        winnerID = clientID;
      }
    }

    const winnerMessage = JSON.stringify({ winnerID, tipo: "winner" });
    ws_server.clients.forEach((client) => {
      client.send(winnerMessage);
    });
  }
}

module.exports = { handleConnection };
