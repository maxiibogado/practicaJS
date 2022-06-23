personasRegistradasDia = [];

personaRegistrada = [];


const eliminarFilas = () => {
  const listaTr = document.querySelectorAll("tr");
  listaTr.forEach((elemento, i) => {
    if (i != 0) {
      elemento.remove();
    }
  });
}

const borrarListadoPacientes = () => {
  arrayPersonasRegistradas = (localStorage.getItem("personasRegistradas") && localStorage.removeItem("personasRegistradas")) || [];
  eliminarFilas();
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

  arrayPersonasRegistradas = JSON.parse(localStorage.getItem('personasRegistradas')) || [] ;

  eliminarFilas();

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
  Swal.fire({
    title: '¿Estás Seguro?',
    text: "No serás capaz de volver atrás",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, deseo limpiar el formulario!'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Borrado!',
        'Se ha limpiado el formulario.',
        'success'
      )
      document.querySelector("#dni").value = "";
      document.querySelector("#nombre").value = "";
      document.querySelector("#apellido").value = "";
      document.querySelector("#estatura").value = "";
      document.querySelector("#peso").value = "";
    }
  })
  
  
  
};

const btnAgregarPaciente = document.querySelector("#addPaciente");
btnAgregarPaciente.addEventListener("click", agregarPaciente);

const btnLimpiarFormulario = document.querySelector("#limpiarForm");
btnLimpiarFormulario &&  btnLimpiarFormulario.addEventListener("click", limpiarFormulario);

const btnBorrarPaciente = document.querySelector("#borrarPaciente");
btnBorrarPaciente && btnBorrarPaciente.addEventListener("click", borrarUltimoPaciente);

const btnBuscarImcMaximo = document.querySelector("#imcMaximo");
btnBuscarImcMaximo && btnBuscarImcMaximo.addEventListener("click", buscarImcMayores);

const btnBuscarImcMinimo = document.querySelector("#imcMinimo");
btnBuscarImcMinimo && btnBuscarImcMinimo.addEventListener("click", buscarImcMenores);


const btnMostrarListado = document.querySelector("#listado");
btnMostrarListado.addEventListener("click", mostrarListado);

const searchBar = document.querySelector("#search");
btnBorrarPaciente && searchBar.addEventListener("input", buscarPorBarra);

const btnBorrarListadoDePaciente = document.querySelector("#borrarListaDePacientes");
btnBorrarListadoDePaciente.addEventListener("click", borrarListadoPacientes);

function buscarPorBarra() {
  arrayPersonasRegistradas = JSON.parse(
    localStorage.getItem("personasRegistradas")
  );

  palabraAbuscar = capitalizarPrimeraLetra(
    document.querySelector("#search").value
  );
  arrayPersonasRegistradasAbuscar = [];
  arrayPersonasRegistradasAbuscar = arrayPersonasRegistradas.filter(
    (persona) =>
      persona.nombre.includes(palabraAbuscar) ||
      persona.apellido.includes(palabraAbuscar)
  );

  eliminarFilas();

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


  arrayPersonasRegistradas &&  arrayPersonasRegistradas.push(paciente);
  personaRegistrada &&  personaRegistrada.push(paciente);
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
    <th scope="col">${arrayPersonasRegistradas && arrayPersonasRegistradas.length}</th>
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

  Swal.fire({
    position: 'top-mid',
    icon: 'success',
    title: 'Su paciente ha sido guardado correctamente.',
    showConfirmButton: false,
    timer: 1000
  })
}

function borrarUltimoPaciente() {
  
  arrayPersonasRegistradas = JSON.parse(localStorage.getItem("personasRegistradas")) || [];

  arrayPersonasRegistradas.pop();
  const listaTr = document.querySelectorAll("tr");
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
  arrayPersonasRegistradas = JSON.parse(localStorage.getItem("personasRegistradas")) || [];
  const arrayImc = arrayPersonasRegistradas.map(persona => persona.imc);
  
  
  imcMinimo1 = Math.min(...arrayImc);
  indices = []
  idMin = arrayImc.indexOf(imcMinimo1);
  
  while (idMin != -1) {
      indices.push(idMin);
      idMin = arrayImc.indexOf(imcMinimo1, idMin + 1);
    }


    personasImcMinimo = arrayPersonasRegistradas.filter(persona => persona.imc == imcMinimo1);

   personasImcMinimoOk = [
    ...personasImcMinimo,
    indices
    
  ]

  console.log(personasImcMinimoOk)
  
  eliminarFilas();
  personasImcMinimoOk.forEach((elemento,i)=>{
   
    if (i == personasImcMinimoOk.length -1) {
       return;
    }
    tbody = document.querySelector("tbody");

    if (personasImcMinimoOk[i].imc < 25) {
      color = "green";
    } else if (personasImcMinimoOk[i].imc > 25 && personasImcMinimoOk[i].imc < 30) {
      color = "yellow";
    } else {
      color = "red";
    }

    tr = document.createElement("tr");

    tr.innerHTML = ` 
    <th scope="col">${personasImcMinimoOk[personasImcMinimoOk.length-1][i] +1}</th>
    <td>${personasImcMinimoOk[i].dni}</td>
    <td>${personasImcMinimoOk[i].nombre}</td>
    <td>${personasImcMinimoOk[i].apellido}</td>
    <td>${personasImcMinimoOk[i].estatura}</td>
    <td>${personasImcMinimoOk[i].peso}</td>
    <td style="color:${color}">${personasImcMinimoOk[i].imc}</td>
    `;
      tbody.append(tr);


  })
} 

function buscarImcMayores() {
  arrayPersonasRegistradas = JSON.parse(localStorage.getItem("personasRegistradas")) || [];
  const arrayImc = arrayPersonasRegistradas.map(persona => persona.imc);
  
  
  imcMaximo = Math.max(...arrayImc);
  indices = []
  idMax = arrayImc.indexOf(imcMaximo);
  
  while (idMax != -1) {
      indices.push(idMax);
      idMax = arrayImc.indexOf(imcMaximo, idMax + 1);
    }


  personasImcMaximo = arrayPersonasRegistradas.filter(persona => persona.imc == imcMaximo);

   personasImcMaximoOk = [
    ...personasImcMaximo,
    indices
    
  ]

  console.log(personasImcMaximoOk)
  
  eliminarFilas();
  personasImcMaximoOk.forEach((elemento,i)=>{
   
    if (i == personasImcMaximoOk.length -1) {
       return;
    }
    tbody = document.querySelector("tbody");

    if (personasImcMaximoOk[i].imc < 25) {
      color = "green";
    } else if (personasImcMaximoOk[i].imc > 25 && personasImcMaximoOk[i].imc < 30) {
      color = "yellow";
    } else {
      color = "red";
    }

    tr = document.createElement("tr");

    tr.innerHTML = ` 
    <th scope="col">${personasImcMaximoOk[personasImcMaximoOk.length-1][i] +1}</th>
    <td>${personasImcMaximoOk[i].dni}</td>
    <td>${personasImcMaximoOk[i].nombre}</td>
    <td>${personasImcMaximoOk[i].apellido}</td>
    <td>${personasImcMaximoOk[i].estatura}</td>
    <td>${personasImcMaximoOk[i].peso}</td>
    <td style="color:${color}">${personasImcMaximoOk[i].imc}</td>
    `;
      tbody.append(tr);


  })

}

function buscarImcMaximo() {

  arrayPersonasRegistradas = JSON.parse(localStorage.getItem("personasRegistradas")) || [];

  if (arrayPersonasRegistradas) {
    const arrayImc = arrayPersonasRegistradas.map((persona) => persona.imc);
    console.log(arrayImc)
    imcMaximo = Math.max(...arrayImc);
    console.log(imcMaximo)
    indices = []
    idMax = arrayImc.indexOf(imcMaximo) + 1;
    while (imcMaximo != -1) {
      indices.push(imcMaximo);
      idMax = array.indexOf(imcMaximo, idMax + 1);
    }
    console.log(indices)
    console.log
    personaImcMaximo = arrayPersonasRegistradas.find(
      (persona) => persona.imc == imcMaximo
    );

    eliminarFilas();

    tbody = document.querySelector("tbody");

    if (personaImcMaximo.imc < 25) {
      color = "green";
    } else if (personaImcMaximo.imc > 25 && personaImcMaximo.imc < 30) {
      color = "yellow";
    } else {
      color = "red";
    }

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
    
    personaImcMinimo = arrayPersonasRegistradas.find(
      (persona) => persona.imc == imcMinimo
    );

    eliminarFilas();
    
    tbody = document.querySelector("tbody");

    if (personaImcMinimo.imc < 25) {
      color = "green";
    } else if (personaImcMinimo.imc > 25 && personaImcMinimo.imc < 30) {
      color = "yellow";
    } else {
      color = "red";
    }

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
