let webSocket = new WebSocket(location.origin.replace(/^http/, "ws"));
let el;
let sigla = ["p1", "p2", "p3", "p4"];
let chi;
let isClientDisabled = false; // Stato che indica se il client è disabilitato

webSocket.onmessage = (event) => {
  const data = JSON.parse(event.data);

  const el = document.getElementsByName("A");
  const el2 = document.getElementsByName("B");

  if (data.error) {
    // Se ricevi un messaggio di errore, mostra il div con il messaggio
    const errorMessageDiv = document.getElementById("errorMessage");
    errorMessageDiv.style.display = "block";
    errorMessageDiv.textContent = data.error;

    // Disabilita l'interazione con la pagina
    isClientDisabled = true;

    // Nascondi il contenuto principale della pagina
    document.getElementById("mainContent").style.display = "none";

    // Puoi aggiungere ulteriori azioni o stili CSS a seconda delle tue esigenze
  } else if (data.position) {
    if (data.position.tipo == 0) {
      let n = data.position.quanti;
      el2.textContent = n;
    }

    if (data.position.tipo == 1) {
      let n = data.position.quanti;
      el2.textContent = n;
    }

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
    }
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
