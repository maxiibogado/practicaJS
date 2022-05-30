class comidaRegistrada{
  constructor(comida,calorias){
  this.comida = comida;
  this.calorias = calorias;
  }
}

registrosDeComida = []; 

const capitalizarPrimeraLetra = palabra => {
  while(palabra == null || palabra.trim() == ""){
    palabra = prompt(`Ingrese su dato correctamente`);
  }
  let palabraSplit = palabra.toLowerCase().split(" ");
  for (let i = 0; i < palabraSplit.length; i++) {
    palabraSplit[i] = palabraSplit[i].charAt(0).toUpperCase() + palabraSplit[i].substring(1);     
  }
   return  palabraSplit.join(' '); 
}

function verificarCantidadDeComidas(cantidadDeComidas) {
  while (cantidadDeComidas == 0 || Number.isNaN(cantidadDeComidas)) {
    cantidadDeComidas = Number(prompt("Ingrese su cantidad de Comidas correctamente"));
  }
  return cantidadDeComidas;
}

function verificarCalorias(calorias) {
  while (calorias == 0 || Number.isNaN(calorias)) {
    calorias = Number(prompt("Ingrese el número de calorias correctamente"));
  }
  return calorias;
}

const suma = (...numeros) => {
  let resultadoSuma = 0;
  numeros.forEach((numero) => (resultadoSuma += numero));
  return resultadoSuma;
};
const resta = (...numeros) => {
  let totalResta = numeros[0];
  for (let i = 1; i < numeros.length; i++) {
    totalResta -= numeros[i];
  }
  return totalResta;
};
const multiplicacion = (...numeros) => {
  let resultadoMultiplicacion = 1;
  numeros.forEach(
    (numero) => (resultadoMultiplicacion = resultadoMultiplicacion * numero)
  );
  return resultadoMultiplicacion;
};
const division = (numero1, numero2) => numero1 / numero2;

function calculadora(operacion, ...numeros) {
  switch (operacion) {
    case "+":
      return suma(...numeros).toFixed(2);
    case "-":
      return resta(...numeros).toFixed(2);
    case "*":
      return multiplicacion(...numeros).toFixed(2);
    case "/":
      return division(...numeros).toFixed(2);
      break;
    default:
      return 0;
      break;
  }
}


cantidadDeComidas = verificarCantidadDeComidas(Number(prompt("Ingrese cuántas comidas realizó")));
for (let index = 0; index < cantidadDeComidas; index++) {
   comida = capitalizarPrimeraLetra(prompt("Ingrese el nombre de su comida"));
   calorias = verificarCalorias(Number(prompt("Ingrese las calorias de su comida")));  
   const comidaDelDia = new comidaRegistrada(comida,calorias);
   registrosDeComida.push(comidaDelDia);
}

console.log(registrosDeComida);

//caloriasTotales = registrosDeComida.reduce((acumulador,comidaRegistrada) => comidaRegistrada.calorias + acumulador,0);
//console.log("Usted consumió: " + caloriasTotales + " calorias en el día");

const arrayCalorias = registrosDeComida.map((comidaRegistrada) =>comidaRegistrada.calorias)

caloriasDiaria = calculadora("+",...arrayCalorias);
alert("Usted consumió: " + caloriasDiaria + " calorias en el día");


