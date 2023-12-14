// Creiamo un div per il contatore dei punti
const ClientsCounter = document.createElement("div");
ClientsCounter.setAttribute("name", "B");
ClientsCounter.setAttribute("class", "ClientsCounter");

ClientsCounter.textContent = "0";

document.body.appendChild(ClientsCounter);
