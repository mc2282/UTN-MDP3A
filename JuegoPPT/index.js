const btnStart = document.getElementById("btnStart");
let pcJuego;
let userJuego;

// opciones [piedra, papel, tijeras]
var opciones = ["stone.png", "paper.png", "scissor.png"];

// Random Math
const juegoInicial = (min, max) => {
  var numero = Math.floor(Math.random() * (max - min + 1) + min);
  return numero;
};
countJuego = 0;
// PC
const juegoMaquina = () => {
  pcJuego = juegoInicial(0, 2);
  let init = document.querySelector("#init");
  let imagen = opciones[pcJuego];

  let createDiv = document.createElement("div");
  createDiv.classList.add("row", "bg-dark", "text-white", "p-2", "filas");

  createDiv.innerHTML = `<div class="col-4"><img src="${imagen}"></div>
  <div id="user_${countJuego}" class="col-4"><button id="btnJugar" class="btn btn-success btn-lg" onclick="juegoUser(${countJuego})">Jugar</button></div>
  <div id="resultado_${countJuego}" class="col-4 rtdos"></div>`;

  init.after(createDiv);
  btnStart.classList.add("d-none");
  btnClear.classList.remove("d-none");

  countJuego++;
};

// Usuario
const juegoUser = (id) => {
  userJuego = juegoInicial(0, 2);
  let imagen = `<img src="${opciones[userJuego]}">`;

  let divUser = document.querySelector("#user_" + id);
  divUser.innerHTML = imagen;

  console.log(pcJuego);
  console.log(userJuego);

  let resultado = document.getElementById("resultado_" + id);
  resultado.innerHTML = result(pcJuego, userJuego);

  juegoMaquina();
};

// Validación
const result = (pc, user) => {
  if (pc == user) {
    return "EMPATE";
  } else if (
    (pc == 0 && user == 1) ||
    (pc == 1 && user == 2) ||
    (pc == 2 && user == 0)
  ) {
    return "GANASTE...";
  } else {
    return "PERDISTE...";
  }
};

let btnClear = document.getElementById("btnClear");

const clearGame = () => {
  let filas = document.querySelectorAll(".filas");

  filas.forEach((fila) => {
    fila.remove();
  });

  btnStart.classList.remove("d-none");
  btnClear.classList.add("d-none");
};

btnStart.addEventListener("click", juegoMaquina);
btnClear.addEventListener("click", clearGame);
