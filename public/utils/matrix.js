const zr = 15; // righe
const zc = 20; // colonne
const zh = 30; // altezza blocco
const zw = 30; // larghezza blocco

const containerWidth = zc * (zw + 3); // larghezza totale del contenitore
const containerHeight = zr * (zh + 3); // altezza totale del contenitore

const container = document.createElement("div");
container.setAttribute("class", "container");

// Calcola la posizione per centrare il reticolo
const leftPosition = (window.innerWidth - containerWidth) / 2; // posizione orizzontale
const topPosition = (window.innerHeight - containerHeight) / 2; // posizione verticale

container.style.left = leftPosition + "px";
container.style.top = topPosition + "px";

for (let j = 0; j < zr; j++) {
  for (let i = 0; i < zc; i++) {
    const l = 10 + i * (zw + 3);
    const t = 10 + j * (zh + 3);

    const nuovo = document.createElement("div");
    nuovo.setAttribute("name", "A");
    nuovo.setAttribute("class", "oggetto");
    nuovo.setAttribute("valore", 0);
    nuovo.style.height = zh + "px"; // Aggiungi "px" per indicare l'unità di misura
    nuovo.style.width = zw + "px"; // Aggiungi "px" per indicare l'unità di misura
    nuovo.style.top = t + topPosition + "px"; // Aggiungi la posizione rispetto al contenitore
    nuovo.style.left = l + leftPosition + "px"; // Aggiungi la posizione rispetto al contenitore

    container.appendChild(nuovo);
  }
}

document.body.appendChild(container);
