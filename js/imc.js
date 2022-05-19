//* Calculo del IMC

const definirComposicionCorporal = imc => {
    if (imc < 18.5) {
        alert("Composición corporal: Peso inferior al normal")
    } else if (imc > 18.5 && imc < 24.9) {
        alert("Composición corporal: Peso normal")
    } else if (imc > 25 && imc < 29.9){
        alert("Composición corporal: Peso superior al normal")
    } else {
        alert("Composición corporal: Obesidad")
    }
} 

function verificarAltura(altura) {
    while (altura == "") {
        altura = Number(prompt("Ingrese su estatura en CM correctamente"));
        return altura;
    }
}

function verificarPeso(peso){
    while (peso == "") {
        peso = Number(prompt("Ingrese su peso en KG correctamente"));
        return peso;
    }
}

function calcularYMostrarIMC(peso,altura) {
    imc = peso / (Math.pow(altura,2)); 
    alert("Su IMC es: " + imc);
}

estatura = verificarAltura(Number(prompt("Ingrese su estatura en CM")));
peso = verificarPeso(Number(prompt("Ingrese su peso en KG")));
calcularYMostrarIMC(peso,estatura);
definirComposicionCorporal(imc);
    


