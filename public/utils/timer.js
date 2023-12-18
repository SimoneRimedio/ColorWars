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
  const displayValue = seconds >= 0 ? seconds : 0;
  // Aggiorna il contenuto del paragrafo con il tempo rimanente
  timerDisplay.textContent = displayValue;
}

function hideStartButton() {
  const startButton = document.getElementById("startButton");
  if (startButton) {
    startButton.style.display = "none";
  }
}
