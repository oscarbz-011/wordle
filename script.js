//Variables
let intentos = 6;
let diccionario = ["APPLE", "HURLS", "WINGS", "YOUTH"];
const palabra = diccionario[Math.floor(Math.random() * diccionario.length)];
const button = document.getElementById("guess-button");
const INPUT = document.getElementById("guess-input");

window.addEventListener("load", init);

function init() {}

// Se determina si es un evento de teclado o de click para ejecutar la funcion intentar
if (
  INPUT.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      intentar();
    }
  })
) {
} else {
  button.addEventListener("click", () => {
    intentar();
  });
}

//Funciones
function intentar() {
  const INTENTO = leerIntento();
  if (INTENTO === "") {
    Swal.fire("Debes ingresar una palabra");
    return;
  }
  if (INTENTO.length !== palabra.length) {
    Swal.fire({
      text: "La palabra debe tener " + palabra.length + " letras",
      icon: "warning",
    });
    return;
  }
  if (INTENTO === palabra) {
    let mensaje = {
      title: "GANASTE!😀",
      text: "Bien hecho! 🎉🎉🎉 ",
      icon: "success",
    };
    terminar(mensaje);
  }
  const GRID = document.getElementById("grid");
  const ROW = document.createElement("div");
  ROW.className = "row";
  for (let i in palabra) {
    const SPAN = document.createElement("span");
    SPAN.className = "letter";
    if (INTENTO[i] === palabra[i]) {
      //VERDE
      SPAN.innerHTML = INTENTO[i];
      SPAN.style.backgroundColor = "green";
    } else if (palabra.includes(INTENTO[i])) {
      //AMARILLO
      SPAN.innerHTML = INTENTO[i];
      SPAN.style.backgroundColor = "yellow";
    } else {
      //GRIS
      SPAN.innerHTML = INTENTO[i];
      SPAN.style.backgroundColor = "grey";
    }
    ROW.appendChild(SPAN);
  }

  GRID.appendChild(ROW);
  intentos--;
  document.getElementById("guesses").innerHTML =
    "Quedan " + intentos + " intentos.";

  if (intentos == 0) {
    let mensaje = {
      title: "PERDISTE!😖",
      text: "La palabra era: " + palabra,
      icon: "error",
    };
    terminar(mensaje);
  }
}

function leerIntento() {
  let intento = document.getElementById("guess-input");
  intento = intento.value;
  intento = intento.toUpperCase();
  return intento;
}

function terminar(mensaje) {
  const INPUT = document.getElementById("guess-input");
  const BOTON = document.getElementById("guess-button");
  INPUT.disabled = true;
  BOTON.disabled = true;

  Swal.fire({
    title: mensaje.title,
    text: mensaje.text,
    icon: mensaje.icon,
  });
}
