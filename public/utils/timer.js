// Gestione del bottone Start
startButton.addEventListener("click", function () {
  // Rendi il bottone invisibile e non cliccabile
  startButton.style.visibility = "hidden";
  startButton.disabled = true;

  // Invia il messaggio di startTimer al server
  const data = JSON.stringify({ startTimer: true });
  webSocket.send(data);
});

function updateTimerDisplay(seconds) {
  // Aggiorna il contenuto del paragrafo con il tempo rimanente
  timerDisplay.textContent = seconds;
}

function hideStartButton() {
  const startButton = document.getElementById("startButton");
  if (startButton) {
    startButton.style.display = "none";
  }
}
