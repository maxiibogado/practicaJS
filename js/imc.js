let personaRegistrada = [];

const obtenerPersonasRegistradas = () => {
    arrayPersonasRegistradas = JSON.parse(localStorage.getItem('personasRegistradas')) || [] ;
}

const almacenarPersonasEnLocalStorage = (mensaje, personas) => {
  localStorage.setItem(mensaje,JSON.stringify(personas));
}

const eliminarFilas = () => {
  const listaTr = document.querySelectorAll("tr");
  listaTr.forEach((fila, numeroFila) => {
    if (numeroFila != 0) fila.remove();
  });
}

const borrarListadoPacientes = () => {
  Swal.fire({
    title: 'Estás seguro de eliminar todo el listado de pacientes?',
    text: "No podrás recuperarlo",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: 'red',
    cancelButtonColor: 'blue',
    confirmButtonText: 'Si, borralo!',
    cancelButtonText: 'No, no borrar!'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Deleted!',
        'Su listado de pacientes ha sido borrado',
        'success'
      )
      arrayPersonasRegistradas = (localStorage.getItem("personasRegistradas") && localStorage.removeItem("personasRegistradas")) || [];
      
      eliminarFilas();
    }
  })
 
};

const capitalizarPrimeraLetra = (palabra) => {
  let palabraSplit = palabra.toLowerCase().split(" ");
  for (let i = 0; i < palabraSplit.length; i++) {
    palabraSplit[i] =
      palabraSplit[i].charAt(0).toUpperCase() + palabraSplit[i].substring(1);
  }
  return palabraSplit.join(" ");
};

const mostrarHtml = (personas) => {
  const tbody = document.querySelector("tbody");
  
  personas.forEach((persona) => {
    if (persona.imc < 25) {
      color = "green";
    } else if (persona.imc > 25 && persona.imc < 30) {
      color = "yellow";
    } else {
      color = "red";
    }

    const tr = document.createElement("tr");

    tr.innerHTML = ` 
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

function implementarDom() {
  obtenerPersonasRegistradas();
  if (arrayPersonasRegistradas.length > 0) {
    mostrarHtml(arrayPersonasRegistradas);
  }
}

function mostrarListado() {

  obtenerPersonasRegistradas();
  
  eliminarFilas();

  mostrarHtml(arrayPersonasRegistradas);
}

const limpiarFormulario = () => {
      document.querySelector("#dni").value = "";
      document.querySelector("#nombre").value = "";
      document.querySelector("#apellido").value = "";
      document.querySelector("#estatura").value = "";
      document.querySelector("#peso").value = "";
  }


const btnImportarPacientes = document.querySelector("#listadojson");
btnImportarPacientes.addEventListener("click", importarListado);

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
  obtenerPersonasRegistradas();

  palabraAbuscar = capitalizarPrimeraLetra(document.querySelector("#search").value);
  
 let arrayPersonasRegistradasAbuscar = arrayPersonasRegistradas.filter((persona) =>  persona.nombre.includes(palabraAbuscar) 
                                      || persona.apellido.includes(palabraAbuscar)) 

  eliminarFilas();

   mostrarHtml(arrayPersonasRegistradasAbuscar);

} 

async function importarListado() {  
   
  const response =  await fetch('./data.json');
  
  const personas =  await response.json();
  
  obtenerPersonasRegistradas();

  arrayPersonasRegistradas = [...personas,...arrayPersonasRegistradas];

  let personasMap = arrayPersonasRegistradas.map(persona => {
  
      return [JSON.stringify(persona), persona]

  });
  let personasMapArr = new Map(personasMap); // Pares de clave y valor

  let unicos = [...personasMapArr.values()]; // Conversión a un array
  
  eliminarFilas();

  mostrarHtml(unicos);

  almacenarPersonasEnLocalStorage("personasRegistradas",unicos);
 
}

function agregarPaciente() {

  obtenerPersonasRegistradas();

  dni = Number(document.querySelector("#dni").value);
  
  nombre = datoSinEspacio(capitalizarPrimeraLetra(document.querySelector("#nombre").value));
  
  apellido = datoSinEspacio(capitalizarPrimeraLetra(document.querySelector("#apellido").value));
  
  estatura = Number(document.querySelector("#estatura").value);
  
  peso = Number(document.querySelector("#peso").value);

   let arrayDNIRegistrados =  arrayPersonasRegistradas.length > 0 ? arrayPersonasRegistradas.map( persona => persona.dni ) : [];  
  
  if(dni == 0) {
    alert('Ingrese su DNI, por favor');
    document.fvalida.dni.focus();
    return ;
  } else if (arrayDNIRegistrados.includes(dni)) {
    alert("Número de DNI ya ingresado. Ingrese un nuevo DNI")
    document.querySelector("#dni").value = "";
    document.fvalida.dni.focus();
    return;
  }

  if (nombre.length == 0) {
    alert('Ingrese su nombre, por favor');
    document.fvalida.nombre.focus();
    return;
  }
  if (apellido.length == 0) {
    alert('Ingresa su apellido, por favor');
    document.fvalida.apellido.focus();
    return;
  } 
  if(estatura == 0) {
    alert('Ingresa su altura, por favor');
    document.fvalida.estatura.focus();
    return;
  } 
  if(peso == 0) {
    alert('Ingresa su altura, por favor');
    document.fvalida.peso.focus();
    return;
  }    

  imc = calcularIMC(peso, estatura);
  
  const paciente = new Persona(dni, nombre, apellido, estatura, peso, imc);

  arrayPersonasRegistradas &&  arrayPersonasRegistradas.push(paciente);
  
  personaRegistrada &&  personaRegistrada.push(paciente);
  
  almacenarPersonasEnLocalStorage("personasRegistradas",arrayPersonasRegistradas);

  mostrarHtml(personaRegistrada);
   
  personaRegistrada = [];

  Swal.fire({
    position: 'top-mid',
    icon: 'success',
    title: 'Su paciente ha sido guardado correctamente.',
    showConfirmButton: false,
    timer: 1000
  })

  limpiarFormulario();

}

function borrarUltimoPaciente() {
  
      obtenerPersonasRegistradas();
      
      arrayPersonasRegistradas.pop();
      
      const listaTr = document.querySelectorAll("tr");
      listaTr.forEach((elemento, i) => {
        if (i == listaTr.length - 1 && i != 0) {
          elemento.remove();
        }
      });

      almacenarPersonasEnLocalStorage("personasRegistradas",arrayPersonasRegistradas);

} 
  

function modificarTitulo() {
  let titulo = document.querySelector("#tituloPrincipal");
  titulo.style.color = "blueviolet";
  titulo.style.textAlign = "center";
}

function datoSinEspacio(dato) {
  return dato.trim();
}

function calcularIMC(peso, altura) {
  return Number((peso / Math.pow(altura, 2)).toFixed(2));
}

function buscarImcMenores() {
  
  Swal.fire(
    'Felicitar a los pacientes!',
    'Llamar y dar el alta!',
    'success'
  )
  
  obtenerPersonasRegistradas() 
  
  const arrayImc = arrayPersonasRegistradas.map(persona => persona.imc);
  
  imcMinimo1 = Math.min(...arrayImc);
  
  personasImcMinimo = arrayPersonasRegistradas.filter(persona => persona.imc == imcMinimo1);

  eliminarFilas();

  mostrarHtml(personasImcMinimo);

} 

function buscarImcMayores() {
  
  Swal.fire(
    'Cuidado con los pacientes!',
    'Verificar comidas y realizar un llamado para dar seguimiento!',
    'warning'
  )
  
  obtenerPersonasRegistradas();  
  
  const arrayImc = arrayPersonasRegistradas.map(persona => persona.imc);
  
  imcMaximo = Math.max(...arrayImc);
 
  personasImcMaximo = arrayPersonasRegistradas.filter(persona => persona.imc == imcMaximo);

  eliminarFilas();
  
  mostrarHtml(personasImcMaximo);
  
}

implementarDom();

modificarTitulo();