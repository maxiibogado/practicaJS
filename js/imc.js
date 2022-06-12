//* Calculo del IMC

personasRegistradasDia = [];
//personasRegistradasSistema = [];
personaRegistrada = [];

class Persona {
  constructor(dni, nombre, apellido, estatura, peso, imc) {
    this.dni = dni;
    this.nombre = nombre;
    this.apellido = apellido;
    this.estatura = estatura;
    this.peso = peso;
    this.imc = imc;
  }
}

const persona1 = new Persona(
  37843550,
  "Maximiliano Ariel",
  "Bogado",
  1.78,
  90,
  28.41
);
const persona2 = new Persona(
  92899424,
  "Patricia Ramona",
  "Morinigo",
  1.65,
  68,
  24.98
);
const persona3 = new Persona(
  40850321,
  "Maria Carolina",
  "Ingolotti",
  1.7,
  65,
  22.49
);
const persona4 = new Persona(14209164, "Marciano", "Bogado", 1.75, 80, 27.43);
//personasRegistradasSistema = [persona1, persona2, persona3, persona4];

const borrarListadoPacientes = () => {
  if (localStorage.getItem('personasRegistradas')) {
    localStorage.removeItem('personasRegistradas')
  } 
    arrayPersonasRegistradas = [];

  const listaTr = document.querySelectorAll("tr");
     listaTr.forEach((elemento,i) =>{
     if (i!= 0) {
       elemento.remove();
     }
    }) 
}

function implementarDom() {
  if (localStorage.getItem("personasRegistradas")) {
    arrayPersonasRegistradas = JSON.parse(
      localStorage.getItem("personasRegistradas")
    );
  } else {
    arrayPersonasRegistradas = [];
  }
  const tbody = document.querySelector("tbody");
  arrayPersonasRegistradas.forEach((persona, i) => {
    const tr = document.createElement("tr");

    tr.innerHTML = ` 
  <th scope="col">${i + 1}</th>
  <td>${persona.dni}</td>
  <td>${persona.nombre}</td>
  <td>${persona.apellido}</td>
  <td>${persona.estatura}</td>
  <td>${persona.peso}</td>
  <td>${persona.imc}</td>
  `;
    tbody.append(tr);

    // if (persona.imc <25) {
    //   const imcaprocesar = document.querySelector("#imcaprocesar")
    //   imcaprocesar.style.backgroundColor = 'green'
    // } else  if (persona.imc > 25 && persona.imc < 30) {
    //     const imcaprocesar = document.querySelector("#imcaprocesar")
    //     imcaprocesar.style.backgroundColor = 'green'
    // } else {
    //   const imcaprocesar = document.querySelector("#imcaprocesar")
    //   imcaprocesar.style.backgroundColor = 'red'
    // }

  });
}

const btnAgregarPaciente = document.querySelector("#addPaciente");
btnAgregarPaciente.addEventListener("click", agregarPaciente);
const btnLimpiarFormulario = document.querySelector('limpiarForm');
btnLimpiarFormulario.addEventListener("click",limpiarFormulario);
const btnBorrarPaciente = document.querySelector("#borrarPaciente");
btnBorrarPaciente.addEventListener("click", borrarUltimoPaciente);
const btnBorrarListadoDePaciente = document.querySelector("#borrarListaDePacientes");
btnBorrarListadoDePaciente.addEventListener("click", borrarListadoPacientes);


const limpiarFormulario = () => {
  document.querySelector("#dni").value = "";
  document.querySelector("#nombre").value = "";
  document.querySelector("#apellido").value = "";
  document.querySelector("#estatura").value = "";
  document.querySelector("#peso").value = "";   
}





function definirEstilo(persona) {
  if (persona.imc < 25) {
    return   `<td  style="color:green">${persona.imc}</td>`
  } else  if (persona.imc > 25 && persona.imc < 30) {
    return   `<td  style="color:yellow">${persona.imc}</td>`
  }
  else {
    return   `<td style="color:yellow">${persona.imc}</td>`
  }
}



function agregarPaciente() {

  dni = verificarDato(Number(document.querySelector("#dni").value));
  nombre = datoSinEspacio(capitalizarPrimeraLetra(document.querySelector("#nombre").value));
  apellido = datoSinEspacio(
    capitalizarPrimeraLetra(document.querySelector("#apellido").value)
  );
  estatura = verificarDato(Number(document.querySelector("#estatura").value));
  peso = verificarDato(Number(document.querySelector("#peso").value));
  imc = calcularIMC(peso, estatura)

  const paciente = new Persona(dni, nombre, apellido, estatura, peso, imc);
  arrayPersonasRegistradas.push(paciente);
  personaRegistrada.push(paciente);
  console.log(arrayPersonasRegistradas);
  console.log(personaRegistrada)
  localStorage.setItem(
    "personasRegistradas",
    JSON.stringify(arrayPersonasRegistradas)
  );
  localStorage.setItem(
    "personaRegistradaDia",
    JSON.stringify(personaRegistrada)
  );


  const tbody = document.querySelector("tbody");
  personaRegistrada.forEach((persona) => {
    const tr = document.createElement("tr");


    tr.innerHTML = ` 
  <th scope="col">${arrayPersonasRegistradas.length}</th>
  <td>${persona.dni}</td>
  <td>${persona.nombre}</td>
  <td>${persona.apellido}</td>
  <td>${persona.estatura}</td>
  <td>${persona.peso}</td>
  <td id="imcaprocesar">${persona.imc}</td>
  `;
    tbody.append(tr);
    
    const td = document.querySelectorAll("#imcaprocesar");

    for (let index = 0; index < td.length; index++) {
      if (persona.imc <25) {
        const imcaprocesar = document.querySelectorAll("#imcaprocesar")

        imcaprocesar[index].style.backgroundColor = 'green'
      } else  if (persona.imc > 25 && persona.imc < 30) {
          const imcaprocesar = document.querySelectorAll("#imcaprocesar")
          imcaprocesar[index].style.backgroundColor = 'yellow'
      } else {
        const imcaprocesar = document.querySelectorAll("#imcaprocesar")
        imcaprocesar[index].style.backgroundColor = 'red'
      }      
    }
   
   

  });

  


  personaRegistrada = [];
}




function borrarUltimoPaciente() {

  arrayPersonasRegistradas  = JSON.parse(localStorage.getItem('personasRegistradas'));
  arrayPersonasRegistradas.pop();
    const listaTr = document.querySelectorAll("tr");
    console.log(listaTr)

        listaTr.forEach((elemento,i) =>{
        if (i == listaTr.length-1 && i != 0) {
        elemento.remove();
        }})

      

     localStorage.setItem(
       "personasRegistradas",
       JSON.stringify(arrayPersonasRegistradas)
     );

}

function modificarTitulo() {
  let titulo = document.querySelector("#tituloPrincipal");
  console.log(titulo);
  titulo.style.color = "blueviolet";
  titulo.style.textAlign = "center";
}

const capitalizarPrimeraLetra = (palabra) => {
  while (palabra == null || palabra.trim() == "") {
    palabra = prompt(`Ingrese su dato correctamente`);
  }
  let palabraSplit = palabra.toLowerCase().split(" ");
  for (let i = 0; i < palabraSplit.length; i++) {
    palabraSplit[i] =
      palabraSplit[i].charAt(0).toUpperCase() + palabraSplit[i].substring(1);
  }
  return palabraSplit.join(" ");
};

const definirComposicionCorporal = (imc) => {
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
  apellido = datoSinEspacio(
    capitalizarPrimeraLetra(prompt("Ingrese su apellido"))
  );
  estatura = verificarDato(Number(prompt("Ingrese su estatura en metros")));
  peso = verificarDato(Number(prompt("Ingrese su peso en KG")));
  imc = calcularIMC(peso, estatura);
  alert("Su IMC es: " + imc);
  definirComposicionCorporal(imc);
  const objeto1 = new Persona(dni, nombre, apellido, estatura, peso, imc);
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
  personaABuscar = capitalizarPrimeraLetra(
    prompt("Ingrese el nombre de la persona a buscar")
  );
  const personaBuscadaPorNombre = personasRegistradasSistema.find((persona) =>
    persona.nombre.includes(personaABuscar)
  );
  if (personaBuscadaPorNombre !== undefined) {
    console.log("La persona buscada es:  %o", personaBuscadaPorNombre);
  } else {
    alert("No hay coincidencia con la búsqueda");
  }
  inicioPrograma();
}

function buscarImcMenores() {
  imcTope = Number(prompt("Ingrese el imc de tope"));
  const imcBuscadoPorTope = personasRegistradasSistema.filter(
    (persona) => persona.imc < imcTope
  );
  if (imcBuscadoPorTope.length == 0) {
    alert("No hay coincidencia en al búsqueda");
  } else {
    console.log("Las personas buscadas con ese IMC son: %o", imcBuscadoPorTope);
  }
  inicioPrograma();
}

function buscarImcMayores() {
  imcTope = Number(prompt("Ingrese el imc de tope inferior"));
  const imcBuscadoPorTope = personasRegistradasSistema.filter(
    (persona) => persona.imc > imcTope
  );
  if (imcBuscadoPorTope.length == 0) {
    alert("No hay coincidencia en al búsqueda");
  } else {
    console.log("Las personas buscadas con ese IMC son: %o", imcBuscadoPorTope);
  }
  inicioPrograma();
}

function buscarImcMaximo() {
  const arrayImc = personasRegistradasSistema.map((persona) => persona.imc);
  imcMaximo = Math.max(...arrayImc);
  alert("El IMC máximo es: " + imcMaximo);
  inicioPrograma();
}

function buscarImcMinimo() {
  const arrayImc = personasRegistradasSistema.map((persona) => persona.imc);
  imcMinimo = Math.min(...arrayImc);
  alert("El IMC mínimo es: " + imcMinimo);
  inicioPrograma();
}

function inicioPrograma() {
  accionUsuario = Number(
    prompt(`Elija una acción:
  1: Filtros de búsqueda.
  2: Agregar un paciente nuevo.
  3: Mostrar listado de pacientes
  4: Salir del programa`)
  );

  switch (accionUsuario) {
    case 1:
      filtroDeBusqueda();
      break;
    case 2:
      mostrar();
      break;
    case 3:
      implementarDom();
      break;
    case 4:
      alert("Gracias por utilizar NutriMax.");
      break;
    default:
      alert("Ingresó el dato incorrecto");
      inicioPrograma();
      break;
  }
}

function filtroDeBusqueda() {
  accionUsuario = Number(
    prompt(`Elija una acción:
  1: Buscar un paciente por nombre.
  2: Buscar IMC mayores a un tope.
  3: Buscar IMC menores a un tope.
  4: Buscar IMC máximo.
  5: Buscar IMC mínimo.
  `)
  );

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

inicioPrograma();

modificarTitulo();
