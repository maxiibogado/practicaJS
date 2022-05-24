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

alert(calculadora("-", 1, 2, 3));
alert(calculadora("*", 1, 2, 3));
