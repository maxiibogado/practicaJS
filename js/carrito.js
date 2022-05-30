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
          carritoDeCompras.push(pelota1);
          break;
        case 2:
          carritoDeCompras.push(pelota2);
          break;
        case 3:
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
          carritoDeCompras.push(mancuerna);
          break;
        case 2:
          carritoDeCompras.push(mancuernaPrincipiante);
          break;
        case 3:
          carritoDeCompras.push(mancuernaPrincipiante);
          break;
      }
  }

  if (confirm("Quiere agregar otro producto al carrito de compras?")) {
    agregarProductoAlCarrito();
  } else {
    alert(
      "Finalizo Compra, su total es de $" + precioTotalCarrito(carritoDeCompras)
    );
    console.log(carritoDeCompras);
  }
}

function filtroPorNombre() {
    productoSeleccionadoPorNombre = prompt("Ingrese el producto a buscar");
    const productoBuscadoPorNombre = nuestrosProductos.filter((producto) =>
      producto.nombre.includes(productoSeleccionadoPorNombre)
    );
    if (productoBuscadoPorNombre.length == 0) {
      alert("No hay coincidencia en la búsqueda");
    } else {
      console.log(productoBuscadoPorNombre);
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
    nuestrosProductos.sort((a, b) => a.precio - b.precio);  // [ 1, 5, 40, 200 ]
    console.log(nuestrosProductos)
}

function filtrodeMayorAMenorPrecio() {
    nuestrosProductos.sort((a, b) => b.precio - a.precio);  // [ 1, 5, 40, 200 ]
    console.log(nuestrosProductos);
}


if (confirm("¿Desea realizar algún filtro de búsqueda?")) {
    filtroARealizar = Number(prompt(`Ingrese el filtro a realizar
                            1: Filtro por nombre
                            2: Filtro por precio
                            3: Filtro de productos de menor a mayor precio
                            4: Filtro de productos de mayor a menor precio`));
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
        default:
            break;
    }                        
       
} else {
  agregarProductoAlCarrito();
}
