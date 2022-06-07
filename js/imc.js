//* Calculo del IMC

personasRegistradasDia = [];
personasRegistradasSistema = [];
personaRegistrada = [];



class Persona {
  constructor(dni,nombre, apellido, estatura, peso,imc) {
    this.dni = dni;
    this.nombre = nombre;
    this.apellido = apellido;
    this.estatura = estatura;
    this.peso = peso;
    this.imc = imc;
  }
}

const persona1 = new Persona(37843550,"Maximiliano Ariel","Bogado",1.78,90,28.41);
const persona2 = new Persona(92899424,"Patricia Ramona","Morinigo",1.65,68,24.98)
const persona3 = new Persona(40850321,"Maria Carolina" , "Ingolotti",1.70,65,22.49)
const persona4 = new Persona(14209164,"Marciano", "Bogado",1.75,80,27.43);

personasRegistradasSistema = [persona1,persona2,persona3,persona4];

function implementarDom() {
  const tbody = document.querySelector('tbody');
personasRegistradasSistema.forEach((persona) => {
  const tr = document.createElement('tr')
  tr.innerHTML = ` 
  <th scope="col">#</th>
  <td>${persona.dni}</td>
  <td>${persona.nombre}</td>
  <td>${persona.apellido}</td>
  <td>${persona.estatura}</td>
  <td>${persona.peso}</td>
  <td>${persona.imc}</td>
  `
  tbody.append(tr);
});
}


const btnAgregarPaciente = document.querySelector('#addPaciente')
btnAgregarPaciente.addEventListener('click', agregarPaciente);
const btnBorrarPaciente = document.querySelector('#borrarPaciente')
btnBorrarPaciente.addEventListener('click', borrarUltimoPaciente);

function agregarPaciente() {
  dni = verificarDato(Number(prompt("Ingrese su DNI sin guiones ni puntos")));
  nombre = datoSinEspacio(capitalizarPrimeraLetra(prompt("Ingrese su nombre")));
  apellido = datoSinEspacio(capitalizarPrimeraLetra(prompt("Ingrese su apellido")));
  estatura = verificarDato(Number(prompt("Ingrese su estatura en metros")));
  peso = verificarDato(Number(prompt("Ingrese su peso en KG")));
  imc = calcularIMC(peso, estatura);
  const paciente = new Persona(dni,nombre, apellido, estatura, peso,imc);
  personaRegistrada.push(paciente);
  console.log(personaRegistrada)
  const tbody = document.querySelector('tbody');
  personaRegistrada.forEach((persona) => {
  const tr = document.createElement('tr')
  tr.innerHTML = ` 
  <th scope="col">#</th>
  <td>${persona.dni}</td>
  <td>${persona.nombre}</td>
  <td>${persona.apellido}</td>
  <td>${persona.estatura}</td>
  <td>${persona.peso}</td>
  <td>${persona.imc}</td>
  `
  tbody.append(tr);
});

}

function borrarUltimoPaciente() {
  personasRegistradasSistema.pop();
  console.log("El último paciente ha sido borrado");
}


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

function verificarDato(dato) {
  while (dato == 0 || Number.isNaN(dato)) {
    dato = Number(prompt("Ingrese su dato correctamente"));
  }
  return dato;
}

function datoSinEspacio(dato) {
  return dato.trim();
}

function calcularIMC(peso, altura) {
  return Number((peso / Math.pow(altura, 2)).toFixed(2));
}

function mostrar() {
  dni = verificarDato(Number(prompt("Ingrese su DNI sin guiones ni puntos")));
  nombre = datoSinEspacio(capitalizarPrimeraLetra(prompt("Ingrese su nombre")));
  apellido = datoSinEspacio(capitalizarPrimeraLetra(prompt("Ingrese su apellido")));
  estatura = verificarDato(Number(prompt("Ingrese su estatura en metros")));
  peso = verificarDato(Number(prompt("Ingrese su peso en KG")));
  imc = calcularIMC(peso, estatura);
  alert("Su IMC es: " + imc);
  definirComposicionCorporal(imc);
  const objeto1 = new Persona(dni,nombre, apellido, estatura, peso,imc);
  personasRegistradasDia.push(objeto1);
  if (confirm("Quiere verificar otra persona")) {
    mostrar();
  } else {
    console.log(
      `Estás son las personas registradas hoy en día ${JSON.stringify(
        personasRegistradasDia
      )}`
    );
    console.table(personasRegistradasDia);
  }
}

function buscarPaciente() {
  personaABuscar = capitalizarPrimeraLetra(prompt("Ingrese el nombre de la persona a buscar"));
    const personaBuscadaPorNombre = personasRegistradasSistema.find((persona) =>
      persona.nombre.includes(personaABuscar)
    );
    if (personaBuscadaPorNombre !== undefined) {
      console.log("La persona buscada es:  %o", personaBuscadaPorNombre);
    } else {
      alert('No hay coincidencia con la búsqueda')
    }
    inicioPrograma();    
}

function buscarImcMenores() {
  imcTope = Number(
      prompt("Ingrese el imc de tope")
    );
    const imcBuscadoPorTope = personasRegistradasSistema.filter(
      (persona) => persona.imc < imcTope
    );
    if (imcBuscadoPorTope.length == 0) {
      alert("No hay coincidencia en al búsqueda");
    } else {
      console.log("Las personas buscadas con ese IMC son: %o",imcBuscadoPorTope);
    }
    inicioPrograma();
}

function buscarImcMayores() {
  imcTope = Number(
      prompt("Ingrese el imc de tope inferior")
    );
    const imcBuscadoPorTope = personasRegistradasSistema.filter(
      (persona) => persona.imc > imcTope
    );
    if (imcBuscadoPorTope.length == 0) {
      alert("No hay coincidencia en al búsqueda");
    } else {
      console.log("Las personas buscadas con ese IMC son: %o",imcBuscadoPorTope);
    }
    inicioPrograma();
}

function buscarImcMaximo() {
  const arrayImc = personasRegistradasSistema.map((persona) => persona.imc)
  imcMaximo = Math.max(...arrayImc);  
  alert("El IMC máximo es: " + imcMaximo);
  inicioPrograma();
}

function buscarImcMinimo() {
  const arrayImc = personasRegistradasSistema.map((persona) => persona.imc)
  imcMinimo = Math.min(...arrayImc);  
  alert("El IMC mínimo es: " + imcMinimo)
  inicioPrograma();
}

function inicioPrograma() {
  accionUsuario = Number(prompt(`Elija una acción:
  1: Filtros de búsqueda.
  2: Agregar un paciente nuevo.
  3: Salir del programa`))

switch (accionUsuario) {
case 1:
filtroDeBusqueda();
break;
case 2:
mostrar();
break;  
case 3:
alert("Gracias por utilizar NutriMax.");
break;    
default:
 alert("Ingresó el dato incorrecto");
 inicioPrograma(); 
break;
}  
}

function filtroDeBusqueda() {
  accionUsuario = Number(prompt(`Elija una acción:
  1: Buscar un paciente por nombre.
  2: Buscar IMC mayores a un tope.
  3: Buscar IMC menores a un tope.
  4: Buscar IMC máximo.
  5: Buscar IMC mínimo.
  `))

  switch (accionUsuario) {
    case 1:
      buscarPaciente();
      break;
    case 2:
      buscarImcMayores();
      break;
    case 3:
      buscarImcMenores();
      break;
    case 4:
      buscarImcMaximo();
      break;
    case 5:
      buscarImcMinimo();
      break;   
    default:
      break;
  }
}

//inicioPrograma();

implementarDom()
