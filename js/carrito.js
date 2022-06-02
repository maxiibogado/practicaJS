class Producto {
  constructor(descripcion, garantia, marca) {
    this.descripcion = descripcion;
    this.garantia = garantia;
    this.marca = marca;
  }
  mostrarMensaje() {
    alert(
      `La descripción del producto es: ${this.descripcion} y tiene ${this.garantia} años de garantia`
    );
  }
}

class Pelota extends Producto {
  constructor(nombre, descripcion, garantia, marca, tipoDePelota, precio) {
    super(descripcion, garantia, marca);
    this.nombre = nombre;
    this.tipoDePelota = tipoDePelota;
    this.precio = precio;
  }
}

class Mancuerna extends Producto {
  constructor(nombre, descripcion, peso, precio) {
    super(descripcion);
    this.nombre = nombre;
    this.peso = peso;
    this.precio = precio;
  }
}

const carritoDeCompras = [];

const pelota1 = new Pelota(
  "Capitan Tsubasa",
  "ideal para el torneo",
  1,
  "Kappa",
  "futbol11",
  5000
);
const pelota2 = new Pelota(
  "Tiki Tiki",
  "va hacia donde queres",
  1,
  "Joma",
  "futbol5",
  6000
);
const pelota3 = new Pelota(
  "One Two",
  "te cansas de hacer magia",
  1,
  "Nike",
  "futsal",
  13000
);
const mancuerna = new Mancuerna(
  "MusculoIntermedio",
  "Rinden 10 puntos",
  10,
  3000
);
const mancuernaPrincipiante = new Mancuerna(
  "MusculoChico",
  "Ideal para principiantes",
  3,
  1000
);
const mancuernaProfesional = new Mancuerna(
  "MusculoDesarrollado",
  "Ideal para deportistas profesionales",
  5,
  2000
);

const nuestrosProductos = [
  pelota1,
  pelota2,
  pelota3,
  mancuerna,
  mancuernaPrincipiante,
  mancuernaProfesional,
];

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

function precioTotalCarrito(carrito) {
  return carrito.reduce(
    (acumulador, elemento) => elemento.precio + acumulador,
    0
  );
}

function agregarProductoAlCarrito() {
  categoriaUsuario = Number(
    prompt(`Elija la categoría de su producto
                          1:Pelotas
                          2:Mancuernas`)
  );
  switch (categoriaUsuario) {
    case 1:
      productoUsuario = Number(
        prompt(`Elija una pelota entre las siguientes opciones:
                                  1: Capitan Tsubasa
                                  2: Tiki Tiki   
                                  3: One Two`)
      );
      switch (productoUsuario) {
        case 1:
        alert("Su producto ha sido agregado al carrito correctamente")  
        carritoDeCompras.push(pelota1);
          break;
        case 2:
          alert("Su producto ha sido agregado al carrito correctamente")  
          carritoDeCompras.push(pelota2);
          break;
        case 3:
          alert("Su producto ha sido agregado al carrito correctamente")  
          carritoDeCompras.push(pelota3);
          break;
      }

      break;
    case 2:
      productoUsuario = Number(
        prompt(`Elija una mancuerna entre las siguientes opciones:
                                  1:MusculoIntermedio,
                                  2:MusculoChico,
                                  3:MusculoDesarrollado   
                                  `)
      );
      switch (productoUsuario) {
        case 1:
        alert("Su producto ha sido agregado al carrito correctamente");    
        carritoDeCompras.push(mancuerna);
          break;
        case 2:
        alert("Su producto ha sido agregado al carrito correctamente")  
        carritoDeCompras.push(mancuernaPrincipiante);
          break;
        case 3:
        alert("Su producto ha sido agregado al carrito correctamente")  
        carritoDeCompras.push(mancuernaPrincipiante);
          break;
      }
  }

  if (confirm("Quiere agregar otro producto al carrito de compras?")) {
    agregarProductoAlCarrito();
  } else {
    alert(
      "Finalizó su compra, su total es de $" + precioTotalCarrito(carritoDeCompras)
    );
    console.log(carritoDeCompras);
  }
}

function filtroPorNombre() {
    productoSeleccionadoPorNombre = capitalizarPrimeraLetra(prompt("Ingrese el producto a buscar"));
    const productoBuscadoPorNombre = nuestrosProductos.find((producto) =>
      producto.nombre.includes(productoSeleccionadoPorNombre)
    );
    if (typeof productoBuscadoPorNombre == 'undefined') {
      alert("No hay coincidencia en la búsqueda");
      inicioPrograma();
    } else {
      console.log("Esté es el resultado de su busqueda: ",productoBuscadoPorNombre);
      if (confirm("¿Desea agregarlo al carrito")) {
        carritoDeCompras.push(productoBuscadoPorNombre);
        alert("Se ha agregado el producto correctamente.");
        inicioPrograma();
      } else {
        inicioPrograma();
      }    
    }



}
function filtroPorPrecio() {
    productoSeleccionadoPorPrecio = Number(
        prompt("Ingrese el precio máximo que puede abonar")
      );
      const productoBuscadoPorPrecio = nuestrosProductos.filter(
        (producto) => producto.precio < productoSeleccionadoPorPrecio
      );
      console.log(productoBuscadoPorPrecio);
      if (productoBuscadoPorPrecio.length == 0) {
        alert("No hay coincidencia en al búsqueda");
      } else {
        console.log(productoBuscadoPorPrecio);
      }
}

function filtroDeMenorAMayorPrecio() {
    nuestrosProductos.sort((a, b) => a.precio - b.precio);  
    console.log(nuestrosProductos)
}

function filtrodeMayorAMenorPrecio() {
    nuestrosProductos.sort((a, b) => b.precio - a.precio);  
    console.log(nuestrosProductos);
}

function filtrodeAZ() {
  nuestrosProductos.sort(function (a, b) {
    if (a.nombre > b.nombre) {
      return 1;
    }
    if (a.nombre < b.nombre) {
      return -1;
    }
    // a must be equal to b
    return 0;
  });
  console.log(nuestrosProductos);
}
function filtrodeZA() {
  nuestrosProductos.sort(function (a, b) {
    if (a.nombre > b.nombre) {
      return -1;
    }
    if (a.nombre < b.nombre) {
      return 1;
    }
    // a must be equal to b
    return 0;
  });


  console.log(nuestrosProductos);
}

function filtroDeBusqueda() {
 
  filtroARealizar = Number(prompt(`Ingrese el filtro a realizar
                            1: Filtro por nombre.
                            2: Filtro por precio.
                            3: Precio: Menor a Mayor.
                            4: Precio: Mayor a Menor.
                            5: Filtro de A - Z.
                            6: Filtro de Z- A.`));
    switch (filtroARealizar) {
        case 1:
            filtroPorNombre();
            break;
        case 2:
            filtroPorPrecio();
            break;
        case 3:
            filtroDeMenorAMayorPrecio();
            break;
        case 4:
            filtrodeMayorAMenorPrecio();
            break;
        case 5:
            filtrodeAZ();
            break;
        case 6:
            filtrodeZA();                
        default:
            alert("Eligió un número incorrecto");
            filtroDeBusqueda();
            break;
    }                        
       
  } 
  
  


function inicioPrograma() {
   opciónUsuario = Number(prompt(`Ingrese la opción deseada
              1: Realizar filtro de búsqueda.
              2: Agregar productos al carrito sin filtros.`));
   switch (opciónUsuario) {
     case 1:
            filtroDeBusqueda();
            break;
     case 2: 
            agregarProductoAlCarrito();
            break;
     default:
            alert("Lo sentimos, no contamos con esa opción. Ingrese una opción correctamente.");
            inicioPrograma();
            break;
   }           

}

inicioPrograma();