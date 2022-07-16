let personaRegistrada = [];
let warning = "";
let entrar = false;
let arrayDNIRegistrados = [];
const placeholderDNI = document.querySelector(`#dni`).placeholder;
const placeholderNombre = document.querySelector("#nombre").placeholder;
const placeholderApellido = document.querySelector("#apellido").placeholder;
const placeholderEstatura = document.querySelector("#estatura").placeholder;
const placeholderPeso = document.querySelector("#peso").placeholder;




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

const limpiarFormulario = () => {
  document.querySelector("#dni").value = "";
  document.querySelector("#nombre").value = "";
  document.querySelector("#apellido").value = "";
  document.querySelector("#estatura").value = "";
  document.querySelector("#peso").value = "";
}

function implementarDom() {
  obtenerPersonasRegistradas();
  if (arrayPersonasRegistradas.length > 0) {
    mostrarHtml(arrayPersonasRegistradas);
  }
}

function ejecutarValidacion(nombreDato) {
  warning = nombreDato.charAt(0) == "e" 
  ? ` La ${nombreDato} no es válida. Ingrese el dato correctamente. <br>` 
  : ` El ${nombreDato} no es valido. Ingrese el dato correctamente. <br>`
  entrar = true;
  document.querySelector(`#${nombreDato}`).value = "";
}


function mostrarListado() {

  obtenerPersonasRegistradas();
  
  eliminarFilas();

  mostrarHtml(arrayPersonasRegistradas);
}

function validarRegistro(dato,nombreDato) {
  let placeholderOriginal = "";
  placeholderOriginal =  document.querySelector(`#${nombreDato}`).placeholder;
  
  if (isNaN(dato) || dato == 0 ) { 
    document.querySelector(`#${nombreDato}`).className = "form-control"; 
    warning = nombreDato.charAt(0) == "e" 
     ? `  ${nombreDato.toUpperCase()}  INCORRECTA. Ingrese el dato.` 
     : `  ${nombreDato.toUpperCase()}  INCORRECTO. Ingrese el dato.`
     entrar = true;
     document.querySelector(`#${nombreDato}`).value = "";
     document.querySelector(`#${nombreDato}`).value = "";
     document.querySelector(`#${nombreDato}`).placeholder = warning;
     document.querySelector(`#${nombreDato}`).className = "test"
     return;
  }
  
  switch (nombreDato) {
    case "dni":
      if( dato  < 10000000 || dato > 99999999)   {
        warning = `El ${nombreDato} NO es válido. Ingresé los 8 dígitos.`
        entrar = true;
        document.querySelector(`#${nombreDato}`).value = "";
        document.querySelector(`#${nombreDato}`).placeholder = warning;
        document.querySelector(`#${nombreDato}`).className = "test"
        return;
    // Se verifica que no se intente ingresar un DNI repetido.
      } else  if (arrayDNIRegistrados.includes(dato)) {
        warning = `El ${nombreDato.toUpperCase()} ya se encuentra registrado. Ingrese un nuevo ${nombreDato.toUpperCase()}.`
        entrar = true;
        document.querySelector(`#${nombreDato}`).value = "";
        document.querySelector(`#${nombreDato}`).placeholder = warning;
        document.querySelector(`#${nombreDato}`).className = "test"
        return;
      }
      
      document.querySelector(`#${nombreDato}`).className = "form-control"; 

      break;
    case "estatura":
      if( dato < 0.62 || dato > 2.60)   {
      //  ejecutarValidacion(nombreDato);
       warning = nombreDato.charAt(0) == "e" 
       ? ` La ${nombreDato} no es válida. Ingrese el dato correctamente.` 
       : ` El ${nombreDato} no es valido. Ingrese el dato correctamente.`
       entrar = true;
       document.querySelector(`#${nombreDato}`).value = "";
       document.querySelector(`#${nombreDato}`).placeholder = warning;
       document.querySelector(`#${nombreDato}`).className = "test"
       return;
      } 
      document.querySelector(`#${nombreDato}`).className = "form-control"; 
      break;
    case "peso":
      if( dato < 2 || dato > 595)   {
        // ejecutarValidacion(nombreDato);
        warning = nombreDato.charAt(0) == "e" 
        ? ` La ${nombreDato} no es válida. Ingrese el dato correctamente.` 
        : ` El ${nombreDato} no es valido. Ingrese el dato correctamente.`
        entrar = true;
        document.querySelector(`#${nombreDato}`).value = "";
        document.querySelector(`#${nombreDato}`).placeholder = warning;
        document.querySelector(`#${nombreDato}`).className = "test"
        return;
      } 
      document.querySelector(`#${nombreDato}`).className = "form-control"; 
      break;

    default:
      break;
      
  }

  if (nombreDato == "dni" ) {
    document.querySelector(`#${nombreDato}`).placeholder = placeholderDNI 
  } else if (nombreDato == "estatura") {
    document.querySelector(`#${nombreDato}`).placeholder = placeholderEstatura
  } else if (nombreDato == "peso") {
    document.querySelector(`#${nombreDato}`).placeholder = placeholderPeso
  }


    // document.querySelector(`#${nombreDato}`).placeholder = placeholder + nombreDato; 
  


}

function validarNombreApellido(dato,nombreDato) {

  if (dato.length < 2) {
    warning = `${nombreDato.toUpperCase()} NO VÁLIDO. Ingrese el dato.`
    entrar = true;
    document.querySelector(`#${nombreDato}`).value = "";
    document.querySelector(`#${nombreDato}`).placeholder = warning;
    document.querySelector(`#${nombreDato}`).className = "test"
    return;
  }
  document.querySelector(`#${nombreDato}`).className = "form-control"; 

  nombreDato == "nombre"    
  ? document.querySelector(`#${nombreDato}`).placeholder = placeholderNombre
  : document.querySelector(`#${nombreDato}`).placeholder = placeholderApellido

}


const btnImportarPacientes = document.querySelector("#listadojson");
btnImportarPacientes.addEventListener("click", importarListado);

// const btnAgregarPaciente = document.querySelector("#addPaciente");
// btnAgregarPaciente.addEventListener("submit", agregarPaciente);

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

const btnForm = document.querySelector("#form");
btnForm.addEventListener("submit", agregarPaciente);

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

  // Solo se toma un solo objeto de aquellos que tienen  igual DNI. Se arma el array cumpliendo la condición 
  unicos = arrayPersonasRegistradas.filter( (v, i, a) => a.findIndex( t =>( t.dni === v.dni) ) === i);
 
  eliminarFilas();

  // Mostrará primero los elementos data y posteriormente los almacenados en arrayPersonasRegistradas
  mostrarHtml(unicos);

  almacenarPersonasEnLocalStorage("personasRegistradas",unicos);
 
}

function agregarPaciente(e) {

  e.preventDefault();

  obtenerPersonasRegistradas();

  dni = Number(document.querySelector("#dni").value);
  
  nombre = datoSinEspacio(capitalizarPrimeraLetra(document.querySelector("#nombre").value));
  
  apellido = datoSinEspacio(capitalizarPrimeraLetra(document.querySelector("#apellido").value));
  
  estatura = Number(document.querySelector("#estatura").value);
  
  peso = Number(document.querySelector("#peso").value);

  const parrafo = document.querySelector("#warnings")

  arrayDNIRegistrados =  arrayPersonasRegistradas.length > 0 ? arrayPersonasRegistradas.map( persona => persona.dni ) : [];  
  
  parrafo.innerHTML = "";
  
  validarRegistro(dni,"dni");
  
  validarNombreApellido(nombre,"nombre");

  validarNombreApellido(apellido,"apellido")
  
  validarRegistro(estatura,"estatura");
  
  validarRegistro(peso,"peso");

  // document.querySelector(`#dni`).placeholder = placeholderOriginal; 
  // document.querySelector(`#nombre`).placeholder = placeholderOriginal; 
  // document.querySelector(`#apellido`).placeholder = placeholderOriginal; 
  // document.querySelector(`#estatura`).placeholder = placeholderOriginal; 
  // document.querySelector(`#estatura`).placeholder = placeholderOriginal; 


    if (entrar) {
      entrar = false
      warning = "";
      return;
    } else{
      parrafo.innerHTML = "Paciente agregado correctamente.";
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

  parrafo.innerHTML = warning;
      entrar = false
       warning = "";

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