personasRegistradasDia = [];

personaRegistrada = [];



const borrarListadoPacientes = () => {
 
  localStorage.getItem("personasRegistradas") && localStorage.removeItem("personasRegistradas");
  arrayPersonasRegistradas = [];

  const listaTr = document.querySelectorAll("tr");
  listaTr.forEach((elemento, i) => {
    if (i != 0) {
      elemento.remove();
    }
  });
};

const capitalizarPrimeraLetra = (palabra) => {
  while (palabra == null) {
    palabra = prompt(`Ingrese su dato correctamente`);
  }
  let palabraSplit = palabra.toLowerCase().split(" ");
  for (let i = 0; i < palabraSplit.length; i++) {
    palabraSplit[i] =
      palabraSplit[i].charAt(0).toUpperCase() + palabraSplit[i].substring(1);
  }
  return palabraSplit.join(" ");
};

function implementarDom() {
  // if (localStorage.getItem("personasRegistradas")) {
  //   arrayPersonasRegistradas = JSON.parse(
  //     localStorage.getItem("personasRegistradas")
  //   );
  // } else {
  //   arrayPersonasRegistradas = [];
  // }

   arrayPersonasRegistradas = JSON.parse(localStorage.getItem('personasRegistradas')) || [] ;

  const tbody = document.querySelector("tbody");
  arrayPersonasRegistradas.forEach((persona, i) => {
    if (persona.imc < 25) {
      color = "green";
    } else if (persona.imc > 25 && persona.imc < 30) {
      color = "yellow";
    } else {
      color = "red";
    }

    const tr = document.createElement("tr");

    tr.innerHTML = ` 
  <th scope="col">${i + 1}</th>
  <td>${persona.dni}</td>
  <td>${persona.nombre}</td>
  <td>${persona.apellido}</td>
  <td>${persona.estatura}</td>
  <td>${persona.peso}</td>
  <td style="color:${color}">${persona.imc}</td>
  `;
    tbody.append(tr);
  });
}

function mostrarListado() {
  // if (localStorage.getItem("personasRegistradas")) {
  //   arrayPersonasRegistradas = JSON.parse(
  //     localStorage.getItem("personasRegistradas")
  //   );
  // } else {
  //   arrayPersonasRegistradas = [];
  // }

  arrayPersonasRegistradas = JSON.parse(localStorage.getItem('personasRegistradas')) || [] ;

  const listaTr = document.querySelectorAll("tr");
  listaTr.forEach((elemento, i) => {
    if (i != 0) {
      elemento.remove();
    }
  });

  const tbody = document.querySelector("tbody");
  arrayPersonasRegistradas.forEach((persona, i) => {
    if (persona.imc < 25) {
      color = "green";
    } else if (persona.imc > 25 && persona.imc < 30) {
      color = "yellow";
    } else {
      color = "red";
    }

    const tr = document.createElement("tr");

    tr.innerHTML = ` 
  <th scope="col">${i + 1}</th>
  <td>${persona.dni}</td>
  <td>${persona.nombre}</td>
  <td>${persona.apellido}</td>
  <td>${persona.estatura}</td>
  <td>${persona.peso}</td>
  <td style="color:${color}">${persona.imc}</td>
  `;
    tbody.append(tr);
  });
}

const limpiarFormulario = () => {
  document.querySelector("#dni").value = "";
  document.querySelector("#nombre").value = "";
  document.querySelector("#apellido").value = "";
  document.querySelector("#estatura").value = "";
  document.querySelector("#peso").value = "";
};

const btnAgregarPaciente = document.querySelector("#addPaciente");
btnAgregarPaciente.addEventListener("click", agregarPaciente);
const btnLimpiarFormulario = document.querySelector("#limpiarForm");
if (btnLimpiarFormulario) {
  btnLimpiarFormulario.addEventListener("click", limpiarFormulario);
}
const btnBorrarPaciente = document.querySelector("#borrarPaciente");
btnBorrarPaciente.addEventListener("click", borrarUltimoPaciente);
const btnBuscarImcMaximo = document.querySelector("#imcMaximo");
btnBuscarImcMaximo.addEventListener("click", buscarImcMaximo);
const btnBuscarImcMinimo = document.querySelector("#imcMinimo");
btnBuscarImcMinimo.addEventListener("click", buscarImcMinimo);
const btnMostrarListado = document.querySelector("#listado");
btnMostrarListado.addEventListener("click", mostrarListado);

const searchBar = document.querySelector("#search");
searchBar.addEventListener("input", buscarPorBarra);

const btnBorrarListadoDePaciente = document.querySelector(
  "#borrarListaDePacientes"
);
btnBorrarListadoDePaciente.addEventListener("click", borrarListadoPacientes);

function buscarPorBarra() {
  arrayPersonasRegistradas = JSON.parse(
    localStorage.getItem("personasRegistradas")
  );

  palabraAbuscar = capitalizarPrimeraLetra(
    document.querySelector("#search").value
  );
  console.log(palabraAbuscar);
  arrayPersonasRegistradasAbuscar = [];
  arrayPersonasRegistradasAbuscar = arrayPersonasRegistradas.filter(
    (persona) =>
      persona.dni.toString().includes(palabraAbuscar) ||
      persona.nombre.includes(palabraAbuscar) ||
      persona.apellido.includes(palabraAbuscar) ||
      persona.estatura.toString().includes(palabraAbuscar) ||
      persona.peso.toString().includes(palabraAbuscar) ||
      persona.imc.toString().includes(palabraAbuscar)
  );
  console.log(arrayPersonasRegistradasAbuscar);

  const listaTr = document.querySelectorAll("tr");
  listaTr.forEach((elemento, i) => {
    if (i != 0) {
      elemento.remove();
    }
  });

  const tbody = document.querySelector("tbody");
  arrayPersonasRegistradasAbuscar.forEach((persona, i) => {
    if (persona.imc < 25) {
      color = "green";
    } else if (persona.imc > 25 && persona.imc < 30) {
      color = "yellow";
    } else {
      color = "red";
    }

    const tr = document.createElement("tr");

    tr.innerHTML = ` 
  <th scope="col">${i + 1}</th>
  <td>${persona.dni}</td>
  <td>${persona.nombre}</td>
  <td>${persona.apellido}</td>
  <td>${persona.estatura}</td>
  <td>${persona.peso}</td>
  <td style="color:${color}">${persona.imc}</td>
  `;
    tbody.append(tr);
  });
}

function agregarPaciente() {
  dni = verificarDato(Number(document.querySelector("#dni").value));
  nombre = datoSinEspacio(
    capitalizarPrimeraLetra(document.querySelector("#nombre").value)
  );
  apellido = datoSinEspacio(
    capitalizarPrimeraLetra(document.querySelector("#apellido").value)
  );
  estatura = verificarDato(Number(document.querySelector("#estatura").value));
  peso = verificarDato(Number(document.querySelector("#peso").value));
  imc = calcularIMC(peso, estatura);

  const paciente = new Persona(dni, nombre, apellido, estatura, peso, imc);
  arrayPersonasRegistradas.push(paciente);
  personaRegistrada.push(paciente);
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
    if (imc < 25) {
      color = "green";
    } else if (imc > 25 && imc < 30) {
      color = "yellow";
    } else {
      color = "red";
    }

    const tr = document.createElement("tr");

    tr.innerHTML = ` 
  <th scope="col">${arrayPersonasRegistradas.length}</th>
  <td>${persona.dni}</td>
  <td>${persona.nombre}</td>
  <td>${persona.apellido}</td>
  <td>${persona.estatura}</td>
  <td>${persona.peso}</td>
  <td style="color:${color}">${persona.imc}</td>
  `;
    tbody.append(tr);
  });

  personaRegistrada = [];
}

function borrarUltimoPaciente() {
  arrayPersonasRegistradas = JSON.parse(
    localStorage.getItem("personasRegistradas")
  );
  arrayPersonasRegistradas.pop();
  const listaTr = document.querySelectorAll("tr");
  console.log(listaTr);

  listaTr.forEach((elemento, i) => {
    if (i == listaTr.length - 1 && i != 0) {
      elemento.remove();
    }
  });

  localStorage.setItem(
    "personasRegistradas",
    JSON.stringify(arrayPersonasRegistradas)
  );
}

function modificarTitulo() {
  let titulo = document.querySelector("#tituloPrincipal");
  titulo.style.color = "blueviolet";
  titulo.style.textAlign = "center";
}

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

function buscarImcMenores() {
  imcTope = Number(prompt("Ingrese el imc de tope"));
  const imcBuscadoPorTope = arrayPersonasRegistradas.filter(
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
  const imcBuscadoPorTope = arrayPersonasRegistradas.filter(
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
  arrayPersonasRegistradas = JSON.parse(
    localStorage.getItem("personasRegistradas")
  );
  if (arrayPersonasRegistradas) {
    const arrayImc = arrayPersonasRegistradas.map((persona) => persona.imc);
    imcMaximo = Math.max(...arrayImc);
    idMax = arrayImc.indexOf(imcMaximo) + 1;
    console.log(arrayImc);
    personaImcMaximo = arrayPersonasRegistradas.find(
      (persona) => persona.imc == imcMaximo
    );
    console.log(personaImcMaximo);

    const listaTr = document.querySelectorAll("tr");
    listaTr.forEach((elemento, i) => {
      if (i != 0) {
        elemento.remove();
      }
    });
    console.log(personaImcMaximo.imc);

    tbody = document.querySelector("tbody");

    if (personaImcMaximo.imc < 25) {
      color = "green";
    } else if (personaImcMaximo.imc > 25 && personaImcMaximo.imc < 30) {
      color = "yellow";
    } else {
      color = "red";
    }

    console.log(color);

    console.log(personaImcMaximo);

    tr = document.createElement("tr");

    tr.innerHTML = ` 
  <th scope="col">${idMax}</th>
  <td>${personaImcMaximo.dni}</td>
  <td>${personaImcMaximo.nombre}</td>
  <td>${personaImcMaximo.apellido}</td>
  <td>${personaImcMaximo.estatura}</td>
  <td>${personaImcMaximo.peso}</td>
  <td style="color:${color}">${personaImcMaximo.imc}</td>
  `;
    tbody.append(tr);
  }
}

function buscarImcMinimo() {
  arrayPersonasRegistradas = JSON.parse(
    localStorage.getItem("personasRegistradas")
  );
  if (arrayPersonasRegistradas) {
    const arrayImc = arrayPersonasRegistradas.map((persona) => persona.imc);
    imcMinimo = Math.min(...arrayImc);
    id = arrayImc.indexOf(imcMinimo) + 1;
    console.log(id);
    console.log(arrayImc);
    personaImcMinimo = arrayPersonasRegistradas.find(
      (persona) => persona.imc == imcMinimo
    );
    console.log(personaImcMinimo);

    const listaTr = document.querySelectorAll("tr");
    listaTr.forEach((elemento, i) => {
      if (i != 0) {
        elemento.remove();
      }
    });
    console.log(personaImcMinimo);

    tbody = document.querySelector("tbody");

    if (personaImcMinimo.imc < 25) {
      color = "green";
    } else if (personaImcMinimo.imc > 25 && personaImcMinimo.imc < 30) {
      color = "yellow";
    } else {
      color = "red";
    }

    console.log(personaImcMinimo);

    tr = document.createElement("tr");

    tr.innerHTML = ` 
  <th scope="col">${id}</th>
  <td>${personaImcMinimo.dni}</td>
  <td>${personaImcMinimo.nombre}</td>
  <td>${personaImcMinimo.apellido}</td>
  <td>${personaImcMinimo.estatura}</td>
  <td>${personaImcMinimo.peso}</td>
  <td style="color:${color}">${personaImcMinimo.imc}</td>
  `;
    tbody.append(tr);
  }
}

implementarDom();

modificarTitulo();
