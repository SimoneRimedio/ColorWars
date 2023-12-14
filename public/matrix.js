zr = 15;
zc = 20;
zh = 30;
zw = 30;
for (j = 0; j < zr; j++) {
  for (i = 0; i < zc; i++) {
    l = 10 + i * (zw + 3);
    t = 10 + j * (zh + 3);
    nuovo = document.createElement("div");
    nuovo.setAttribute("name", "A");
    nuovo.setAttribute("class", "oggetto");
    nuovo.setAttribute("valore", 0);
    nuovo.style.height = zh;
    nuovo.style.width = zw;
    nuovo.style.top = t;
    nuovo.style.left = l;
    document.body.appendChild(nuovo);
  }
}
