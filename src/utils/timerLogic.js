let timer;
let timerDuration = 20;

function startTimer() {
  let counter = timerDuration;
  broadcastTimer(counter);

  timer = setInterval(() => {
    counter--;
    broadcastTimer(counter);

    if (counter < 0) {
      clearInterval(timer);
      determineWinner();
    }
  }, 1000);
}

function broadcastTimer(seconds) {
  // Invia il valore del timer a tutti i client
  const data = JSON.stringify({ timer: seconds, tipo: "timer" });
  wsServer.clients.forEach((client) => {
    client.send(data);
  });

  // Se il timer è stato avviato, invia un messaggio "startTimer"
  if (seconds === timerDuration) {
    const startTimerData = JSON.stringify({ startTimer: true, tipo: "timer" });
    wsServer.clients.forEach((client) => {
      client.send(startTimerData);
    });
  }
}

function determineWinner() {
  let winnerID = null;
  let maxElements = -1;

  // Itera attraverso tutti i clientElements per trovare il vincitore
  for (const [clientID, elements] of Object.entries(clientElements)) {
    if (elements > maxElements) {
      maxElements = elements;
      winnerID = clientID;
    }
  }

  // Invia un messaggio indicando il vincitore a tutti i client
  const winnerMessage = JSON.stringify({ winnerID, tipo: "winner" });
  ws_server.clients.forEach((client) => {
    client.send(winnerMessage);
  });
}

module.exports = { startTimer, broadcastTimer, determineWinner };
