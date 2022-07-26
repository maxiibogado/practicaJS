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
  
  const nombreDatos = ["#dni","#nombre","#apellido","#estatura","#peso"]
  const placeholders = [placeholderDNI,placeholderNombre,placeholderApellido,placeholderEstatura,placeholderPeso]

  for (let i = 0; i < nombreDatos.length; i++) {
    document.querySelector(nombreDatos[i]).value = "";
    document.querySelector(nombreDatos[i]).placeholder = placeholders[i];
    document.querySelector(nombreDatos[i]).className = "form-control";
  }

}

const ingresarClaseInputOriginal = (nombreDato) => {
  document.querySelector(`#${nombreDato}`).className = "form-control"; 
}

const ingresarPlaceholderOriginal = (nombreDato) =>{
  
  if (nombreDato == "dni" ) {
    document.querySelector(`#${nombreDato}`).placeholder = placeholderDNI 
  } else if (nombreDato == "estatura") {
    document.querySelector(`#${nombreDato}`).placeholder = placeholderEstatura
  } else if (nombreDato == "peso") {
    document.querySelector(`#${nombreDato}`).placeholder = placeholderPeso
  } else if (nombreDato == "nombre"){
    document.querySelector(`#${nombreDato}`).placeholder = placeholderNombre
  } else if (nombreDato == "apellido"){
    document.querySelector(`#${nombreDato}`).placeholder = placeholderApellido
  } 

}
 
function implementarDom() {
  obtenerPersonasRegistradas();
  if (arrayPersonasRegistradas.length > 0) {
    mostrarHtml(arrayPersonasRegistradas);
  }
}

function modificarInput(nombreDato) {
  document.querySelector(`#${nombreDato}`).value = "";
  document.querySelector(`#${nombreDato}`).placeholder = warning;
  document.querySelector(`#${nombreDato}`).className = "invalid"
}

function ejecutarValidacion(nombreDato) {
  warning = nombreDato.charAt(0) == "e" 
  ? ` La ${nombreDato} no es válida. Ingrese el dato correctamente.` 
  : ` El ${nombreDato} no es valido. Ingrese el dato correctamente.`
  entrar = true;
}

function mostrarListado() {

  obtenerPersonasRegistradas();
  
  eliminarFilas();

  mostrarHtml(arrayPersonasRegistradas);
}

function validarRegistro(dato,nombreDato) {
  
  if (isNaN(dato) || dato == 0 ) { 
    warning = nombreDato.charAt(0) == "e" 
     ? `  ${nombreDato.toUpperCase()}  INCORRECTA. Ingrese el dato.` 
     : `  ${nombreDato.toUpperCase()}  INCORRECTO. Ingrese el dato.`
    entrar = true;
    modificarInput(nombreDato);
    return;
  }
  
  switch (nombreDato) {
    
    case "dni":
      if( dato  < 10000000 || dato > 99999999)   {
        warning = `El ${nombreDato} NO es válido. Ingresé los 8 dígitos.`
        entrar = true;
        modificarInput(nombreDato);
        return;
    // Se verifica que no se intente ingresar un DNI repetido.
      } else  if (arrayDNIRegistrados.includes(dato)) {
        warning = `El ${nombreDato.toUpperCase()} ya se encuentra registrado.`
        entrar = true;
        modificarInput(nombreDato);
        return;
      }
      ingresarClaseInputOriginal(nombreDato);
    break;
    
    case "estatura":
      if( dato < 0.62 || dato > 2.60)   {
       ejecutarValidacion(nombreDato);  
       modificarInput(nombreDato);
       return;
      } 
      ingresarClaseInputOriginal(nombreDato);
      break;
    
      case "peso":
      if( dato < 2 || dato > 595)   {
        ejecutarValidacion(nombreDato);
        modificarInput(nombreDato);
        return;
      } 
      ingresarClaseInputOriginal(nombreDato);
      break;

    default:
      break;
      
  }

}

function validarNombreApellido(dato,nombreDato) {

  if (dato.length < 2) {
    warning = `${nombreDato.toUpperCase()} NO VÁLIDO. Ingrese el dato.`
    entrar = true;
    modificarInput(nombreDato);
    return;
  }
  ingresarClaseInputOriginal(nombreDato);
  ingresarPlaceholderOriginal(nombreDato);

}

const btnImportarPacientes = document.querySelector("#listadojson");
btnImportarPacientes.addEventListener("click", importarListado);

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

const btnMostrarListadoMayorAMenorPeso = document.querySelector("#mayorAMenor");
btnMostrarListadoMayorAMenorPeso.addEventListener("click", ordenarMayorAMenorPeso);

const btnMostrarListadoMenorAMayorPeso = document.querySelector("#menorAMayor");
btnMostrarListadoMenorAMayorPeso.addEventListener("click", ordenarMenorAMayorPeso);

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

  arrayDNIRegistrados =  arrayPersonasRegistradas.length > 0 ? arrayPersonasRegistradas.map( persona => persona.dni ) : [];  
    
  validarRegistro(dni,"dni");
  
  validarNombreApellido(nombre,"nombre");

  validarNombreApellido(apellido,"apellido")
  
  validarRegistro(estatura,"estatura");
  
  validarRegistro(peso,"peso");


    if (entrar) {
      entrar = false
      warning = "";
      return;
    } else{
      Swal.fire({
        position: 'top-mid',
        icon: 'success',
        title: 'Su paciente ha sido guardado correctamente.',
        showConfirmButton: false,
        timer: 1000
        })
    }

  imc = calcularIMC(peso, estatura);
  
  const paciente = new Persona(dni, nombre, apellido, estatura, peso, imc);

  arrayPersonasRegistradas &&  arrayPersonasRegistradas.push(paciente);
  
  personaRegistrada &&  personaRegistrada.push(paciente);
  
  almacenarPersonasEnLocalStorage("personasRegistradas",arrayPersonasRegistradas);

  mostrarHtml(personaRegistrada);
   
  personaRegistrada = [];

  limpiarFormulario();

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
  
  obtenerPersonasRegistradas() 
  
  const arrayImc = arrayPersonasRegistradas.map(persona => persona.imc);
  
  imcMinimo1 = Math.min(...arrayImc);
  
  personasImcMinimo = arrayPersonasRegistradas.filter(persona => persona.imc == imcMinimo1);

  eliminarFilas();

  mostrarHtml(personasImcMinimo);

  

} 

function buscarImcMayores() {
  
  obtenerPersonasRegistradas();  
  
  const arrayImc = arrayPersonasRegistradas.map(persona => persona.imc);
  
  imcMaximo = Math.max(...arrayImc);
 
  personasImcMaximo = arrayPersonasRegistradas.filter(persona => persona.imc == imcMaximo);

  eliminarFilas();
  
  mostrarHtml(personasImcMaximo);
  
}

function ordenarMayorAMenorPeso() {
  obtenerPersonasRegistradas() ;
  console.log(arrayPersonasRegistradas);
  arrayPersonasRegistradas.sort(function(a,b){return b.peso - a.peso;});  
  eliminarFilas();
  mostrarHtml(arrayPersonasRegistradas);
}

function ordenarMenorAMayorPeso() {
  obtenerPersonasRegistradas() ;
  console.log(arrayPersonasRegistradas);
  arrayPersonasRegistradas.sort(function(a,b){return a.peso - b.peso;});  
  eliminarFilas();
  mostrarHtml(arrayPersonasRegistradas);
}

implementarDom();

modificarTitulo();