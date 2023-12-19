let webSocket = new WebSocket(location.origin.replace(/^http/, "ws"));
let el;
let sigla = ["p1", "p2", "p3", "p4"];
let chi;
let isClientDisabled = false; // Stato che indica se il client è disabilitato
let gameStarted = false; // Stato che indica se il gioco è iniziato
let clientID; // Variabile per memorizzare l'ID del client

webSocket.onmessage = (event) => {
  const data = JSON.parse(event.data);

  const el = document.getElementsByName("A");

  if (data.error) {
    // Se ricevi un messaggio di errore, mostra il div con il messaggio
    const errorMessageDiv = document.getElementById("errorMessage");
    errorMessageDiv.style.display = "block";
    errorMessageDiv.textContent = data.error;
    isClientDisabled = true; // Disabilita l'interazione con la pagina
  } else if (data.position) {
    if (data.position.tipo == 2) {
      let i = data.position.index;
      colore = data.position.colore;
      chi = data.position.chi;
      el[i].valore = chi;
      el[i].style.backgroundColor = colore;
      el[i].innerHTML = sigla[chi - 1];
    }
  } else if (data.tipo === "timer") {
    // Aggiorna il display del timer
    updateTimerDisplay(data.timer);
    // Nascondi il bottone "Start" quando ricevi il messaggio "startTimer"
    if (data.startTimer) {
      hideStartButton();
      gameStarted = true; // Imposta gameStarted su true quando il gioco inizia
    }
  } else if (data.tipo === "winner" && data.winnerID) {
    const winnerDisplay = document.getElementById("winnerDisplay");
    winnerDisplay.textContent =
      "Il giocatore\t\t\t\t " + data.winnerID + "\t\t\t\t ha vinto!";
    winnerDisplay.style.display = "block";
  } else if (data.tipo === "clientID" && data.clientID) {
    // Aggiorna l'ID del client
    clientID = data.clientID;

    // Aggiorna il display del clientDisplay
    updateClientDisplay();
  }

  // Nuova condizione per gestire la matrice
  if (gameStarted && !isClientDisabled) {
    // Se il gioco è iniziato e il client non è disabilitato, rendi visibile e cliccabile la matrice
    container.style.display = "grid";
    container.style.pointerEvents = "auto";
  } else {
    // Altrimenti, nascondi e disabilita la matrice
    container.style.display = "none";
    container.style.pointerEvents = "none";
  }
};

const d = document.getElementsByName("A");
for (i = 0; i < d.length; i++) {
  (function (index) {
    d[index].addEventListener("mouseover", function () {
      let manda = {
        pos: index,
        cosa: sigla[chi],
      };
      const data = JSON.stringify({ manda: manda });
      webSocket.send(data);
    });
  })(i);
}

// Funzione per aggiornare il clientDisplay
function updateClientDisplay() {
  const clientDisplay = document.getElementById("clientDisplay");
  if (clientDisplay) {
    clientDisplay.textContent = "Player\t\t\t" + clientID;
  }
}

document.getElementById("hoverDiv").addEventListener("mouseover", function () {
  document.getElementById("customText").style.display = "block";
});

document.getElementById("hoverDiv").addEventListener("mouseout", function () {
  document.getElementById("customText").style.display = "none";
});
