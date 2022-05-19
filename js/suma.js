
const suma = (...numeros) => 
{ let resultadoSuma = 0;
 numeros.forEach(numero => resultadoSuma += numero)
 return resultadoSuma;
}
const resta = (...numeros) => 
{   let totalResta = numeros[0];
    for (let i = 1; i < numeros.length; i++){
        totalResta -= numeros[i]
    }
    return totalResta;
}
const multiplicacion = (...numeros) => 
{   let resultadoMultiplicacion = 1;
    numeros.forEach(numero => resultadoMultiplicacion = resultadoMultiplicacion* numero)
    return resultadoMultiplicacion;
}
const division = (numero1,numero2) => numero1/numero2;


function calculadora(operacion,...numeros) {
    switch (operacion) {
        case "+":
            let resultadoSuma = 0;
            numeros.forEach(numero => resultadoSuma += numero)
            return resultadoSuma;
            // suma(numeros);
        case "-":
            let totalResta = numeros[0];
            for (let i = 1; i < numeros.length; i++){
            totalResta -= numeros[i]
            }
            return totalResta;
        case "*":
            let resultadoMultiplicacion = 1;
            numeros.forEach(numero => resultadoMultiplicacion = resultadoMultiplicacion* numero)
            return resultadoMultiplicacion;
        case "/":
            return division(numeros);
            break;
        default:
            return 0;
            break;
    }
}

console.log(calculadora("+",2,3,4));

console.log(calculadora("-",4,3,5))

console.log(calculadora("*",4,2,5))
