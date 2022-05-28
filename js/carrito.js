class Producto{
    constructor(descripcion,garantia,marca){
    this.descripcion = descripcion;
    this.garantia = garantia;
    this.marca = marca;
    }
mostrarMensaje(){
    alert(`La descripción del producto es: ${this.descripcion} y tiene ${this.garantia} años de garantia`)}
}

class Pelota extends Producto{
    constructor(nombre,descripcion,garantia,marca,tipoDePelota,precio){
        super(descripcion,garantia,marca);
        this.nombre = nombre;
        this.tipoDePelota = tipoDePelota; 
        this.precio = precio;
    }  
}

class Mancuerna extends Producto {
    constructor(descripcion,peso,precio){
    super(descripcion);
    this.peso = peso;
    this.precio = precio;
    }
}

const pelota1 = new Pelota("Capitan Tsubasa","ideal para el torneo",1,"Kappa","futbol11",5000);
const pelota2 = new Pelota("Tiki Tiki","va hacia donde queres",1,"Joma","futbol5",6000);
const pelota3 = new Pelota("One Two","te cansas de hacer magia",1,"Nike","futsal",13000);
const mancuerna = new Mancuerna("Rinden 10 puntos",10,3000);
const mancuernaPrincipiante = new Mancuerna("Ideal para principiantes",3,1000);
const mancuernaProfesional = new Mancuerna("Ideal para deportistas profesionales",5,2000);


productoUsuario = prompt(`Elija la categoría de su producto
                          1:Pelotas
                          2:Mancuernas`)



switch (key) {
    case value:
        
        break;

    default:
        break;
}


