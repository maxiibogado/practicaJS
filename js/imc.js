//* Calculo del IMC

personasRegistradas = [];

class Persona {
  constructor(nombre, apellido, estatura, peso,imc) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.estatura = estatura;
    this.peso = peso;
    this.imc = imc;
  }
}

const capitalizarPrimeraLetra = palabra => {
  while(palabra == null || palabra.trim() == ""){
    palabra = prompt(`Ingrese su dato correctamente`);
  }
 return (palabra.charAt(0).toUpperCase() + palabra.slice(1).toLowerCase())}

const definirComposicionCorporal = imc => {
  if (imc < 18.5) {
    alert("Composición corporal: Peso inferior al normal");
  } else if (imc > 18.5 && imc < 24.9) {
    alert("Composición corporal: Peso normal");
  } else if (imc > 25 && imc < 29.9) {
    alert("Composición corporal: Peso superior al normal");
  } else {
    alert("Composición corporal: Obesidad");
  }
};

function verificarAltura(altura) {
  while (altura == 0 || Number.isNaN(altura)) {
    altura = Number(prompt("Ingrese su estatura en metros correctamente"));
  }
  return altura;
}

function verificarPeso(peso) {
  while (peso == 0 || Number.isNaN(peso)) {
    peso = Number(prompt("Ingrese su peso en KG correctamente"));
  }
  return peso;
}

function verificarNombre(nombre) {
  return nombre.trim();
}

function verificarApellido(apellido) {
  return apellido.trim();
}

function calcularIMC(peso, altura) {
  return Number((peso / Math.pow(altura, 2)).toFixed(2));
}

function mostrar() {
  nombre = verificarNombre(capitalizarPrimeraLetra(prompt("Ingrese su nombre")));
  apellido = verificarApellido(capitalizarPrimeraLetra(prompt("Ingrese su apellido")));
  estatura = verificarAltura(Number(prompt("Ingrese su estatura en metros")));
  peso = verificarPeso(Number(prompt("Ingrese su peso en KG")));
  imc = calcularIMC(peso, estatura);
  alert("Su IMC es: " + imc);
  definirComposicionCorporal(imc);
  const objeto1 = new Persona(nombre, apellido, estatura, peso,imc);
  personasRegistradas.push(objeto1);
  if (confirm("Quiere verificar otra persona")) {
    mostrar();
  } else {
    console.log(
      `Estás son las personas registradas hoy en día ${JSON.stringify(
        personasRegistradas
      )}`
    );
    console.table(personasRegistradas);
  }
}

mostrar();


