primerNumero = 0;
i = 0;
total = 0;
segundoNumero = 0;
acumulador = 0;
textoAConcatenar = "";
textoConcatenado = "";
numeroDelUsuario = 0;

let opcion = Number(
  prompt(`Ingrese una opción
1 - Sumar 2 números en cada repetición
2 - Concatener un valor en cada repetición
3-  Repetir el mensaje X veces
`)
);

switch (opcion) {
  case 1:
    let cantidadDeNumeros = parseInt(
      prompt("Ingrese la cantidad de números a ingresar")
    );

    primerNumero = parseInt(prompt("Ingrese un número"));

    while (Number.isNaN(primerNumero)) {
      primerNumero = parseInt(prompt("Ingrese un número correctamente"));
    }

    for (let i = 1; i <= cantidadDeNumeros; i++) {
      segundoNumero = parseInt(
        prompt("Ingrese el número a sumar a su primer número")
      );
      while (Number.isNaN(segundoNumero)) {
        segundoNumero = parseInt(prompt("Ingrese otro número correctamente"));
      }
      total = primerNumero + segundoNumero;
      alert(`La suma de los 2 números es ${total}`);
    }
    break;
  case 2:
    textoUsuario = prompt("Ingrese un texto");
    // valido que el usuario no haya apretado enter sin ningún carácter ingresado.
    while (textoUsuario == "") {
    textoUsuario = prompt("Ingrese un texto");
    }
    
    while (textoAConcatenar != "ESC") {
      textoAConcatenar = prompt("Ingrese un texto a concatenar");
      textoConcatenado = textoConcatenado + textoAConcatenar;
      alert(`Su texto concatenado es ${textoUsuario + textoConcatenado}`);
    }
    break;
  case 3:
    numeroDelUsuario = Number(
      prompt("Ingrese el número de la cantidad de veces a repetir el texto")
    );
    while (numeroDelUsuario == "") {
      numeroDelUsuario = Number(
        prompt("Ingrese el número de la cantidad de veces a repetir el texto correctamente")
      );
    }
    do {
      textoARepetir = prompt("Ingrese el texto a repetir");
    } while (textoARepetir == "");

    for (let index = 1; index <= numeroDelUsuario; index++) {
      console.log(
        textoARepetir +
          " se repetira " +
          numeroDelUsuario +
          " veces y está es la iteración " +
          index
      );
    }
    break;

  default:
    alert("Error en el número")
    console.error("Error en el número");
    break;
}
