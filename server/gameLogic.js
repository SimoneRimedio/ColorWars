// gameLogic.js

let timer;
let timerDuration = 20;
let clientElements = {};

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
    const startTimerData = JSON.stringify({ startTimer: true, tipo: "timer" });
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

module.exports = { startTimer, broadcastTimer, determineWinner };
