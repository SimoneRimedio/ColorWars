let quanti = 0;
let maxClients = 4;
let clients = [];
let colori = ["black", "green", "blue", "red"];
let clientElements = {};

function handleClientConnection(ws) {
  quanti++;

  if (quanti > maxClients) {
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

  // Invia l'ID del client appena connesso
  ws.send(JSON.stringify({ clientID: ws.id, tipo: "clientID" }));

  // Esempio: Invia un messaggio a tutti i client quando un nuovo client si connette
  wsServer.clients.forEach((client) => {
    if (client !== ws && client.readyState === WebSocket.OPEN) {
      client.send("Un nuovo giocatore si è unito!");
    }
  });

  // Esempio: Ricevi messaggi dal client
  ws.on("message", (message) => {
    const arriva = JSON.parse(message);

    if (arriva && arriva.startTimer) {
      // Logica per avviare il timer quando un client preme "Start"
      startTimer();

      // Invia un messaggio solo al client che ha avviato il timer
      const timerStartedData = JSON.stringify({
        timerStarted: true,
        tipo: "timer",
      });
      ws.send(timerStartedData);
    }

    if (arriva && arriva.manda && arriva.manda.pos !== undefined) {
      // Logica per gestire i messaggi del client
      const i = arriva.manda.pos;

      clientElements[ws.id] = clientElements[ws.id] || 0;
      clientElements[ws.id] += 1;

      let position = {
        index: i,
        colore: colori[ws.id - 1],
        chi: ws.id,
        tipo: 2,
      };
      const data = JSON.stringify({ position: position });
      wsServer.clients.forEach((client) => {
        client.send(data);
      });
    }
  });

  // Esempio: Gestisci la chiusura della connessione
  ws.on("close", () => {
    for (let k = 0; k < clients.length; k++) {
      if (clients[k] === ws.id) {
        clients.splice(k, 1);
      }
    }
    console.log("Client " + ws.id + " has disconnected!");

    wsServer.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send("Un giocatore si è disconnesso!");
      }
    });
  });
}

module.exports = { handleClientConnection };
