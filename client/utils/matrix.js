const zr = 15; // righe
const zc = 20; // colonne
const zh = 30; // altezza blocco
const zw = 30; // larghezza blocco

const containerWidth = zc * (zw + 3); // larghezza totale del contenitore
const containerHeight = zr * (zh + 3); // altezza totale del contenitore

// Creazione del container principale
const container = document.createElement("div");
container.setAttribute("class", "container");
container.style.width = containerWidth + "px";
container.style.height = containerHeight + "px";

// Aggiungi il container al body del documento
document.body.appendChild(container);

// Creazione della matrice di elementi
for (let j = 0; j < zr; j++) {
  for (let i = 0; i < zc; i++) {
    const l = i * (zw + 3);
    const t = j * (zh + 3);

    const nuovo = document.createElement("div");
    nuovo.setAttribute("name", "A");
    nuovo.setAttribute("class", "oggetto");
    nuovo.setAttribute("valore", 0);
    nuovo.style.height = zh + "px";
    nuovo.style.width = zw + "px";
    nuovo.style.top = t + "px";
    nuovo.style.left = l + "px";

    container.appendChild(nuovo);
  }
}
