// Evento Ready

$(() => {
  carrito.constructor();

  carrito_view.renderCatalogo();
  carrito_view.totalProductos();
  carrito_view.totalProductosCompra();
  carrito_view.renderCarrito();
  carrito_view.renderCarritoCompra();
 
  console.log(carrito.getCarrito);
 
 
});

// Objeto Carrito

function Carrito() {
  this.catalogo = productos;

  // Se verifica si existe el carrito en el LocalStorage, sino existe se crea el objeto carrito.
  this.constructor = function () {
    if (!localStorage.getItem("carrito")) {
      localStorage.setItem("carrito", "[]");
    }
  };

  // Parse a carrito
  this.getCarrito = JSON.parse(localStorage.getItem("carrito"));

  // Se verifica que el producto se encuentre en el catalogo de productos
  this.agregarItem = function (item) {
    let registro;
    for (i of this.catalogo) {
      if (i.id === item) {
        registro = i;
      }
    }

    // Si no lo encuentra se termina la funcion
    if (!registro) {
      return;
    }

    // Si el producto esta repetido en el carrito, se aumenta la cantidad
    for (i of this.getCarrito) {
      if (i.id === item) {
        i.cantidad++;
        console.log(this.getCarrito);

        localStorage.setItem("carrito", JSON.stringify(this.getCarrito));
        return;
      }
    }
    // Si no encuentra el item en el carrito, se agrega el nuevo producto al carrito
    registro.cantidad = 1;

    this.getCarrito.push(registro);

    console.log(this.getCarrito);
    localStorage.setItem("carrito", JSON.stringify(this.getCarrito));
  };

  // Se calcula el precio total del producto, multiplicando la cantidad por el precio
  this.getTotal = function () {
    let total = 0;
    for (i of this.getCarrito) {
      total +=
        parseFloat(i.cantidad).toFixed(2) * parseFloat(i.precio).toFixed(2);
    }

    return total.toFixed(2);
  };

  // Se elimina el producto del carrito
  this.eliminarItem = function (item) {
    for (let i in this.getCarrito) {
      if (this.getCarrito[i].id === item) {
        this.getCarrito.splice(i, 1);
      }
    }
    localStorage.setItem("carrito", JSON.stringify(this.getCarrito));
  };
}

// Objeto Carrito_View, sera la parte visual del carrito en el DOM

function Carrito_View() {
  this.renderCatalogo = function () {
    for (let i in carrito.catalogo) {
      // Se agregan los productos al DOM
      $("#listaProductos").append(`
            
                
                               <li>
                                      <div  class="card" category="${carrito.catalogo[i].categoria}" marca="${carrito.catalogo[i].marca.toLowerCase()}">
                                      <img src="${carrito.catalogo[i].imagen}" class="card-img-center img-fluid" alt="${carrito.catalogo[i].nombre.toLowerCase()}">
                                          <div class="card-body">
                                             <p>${carrito.catalogo[i].nombre}</p>
                                              <span>ARS $${carrito.catalogo[i].precio}</span>
                                             <a href="#" class="btn btn-primary" id="agregarProducto" data-producto="${carrito.catalogo[i].id}">Agregar</a>
                                          </div>
                                      </div>
                              </li>     
                    
                           `);
    }
  };

  // Se agregan los productos al carrito
  this.renderCarrito = function () {
    $("#productosCarrito").html("");
    if(carrito.getCarrito.length <= 0){
       $("#productosCarrito").append(`
       <div class="col-12"><p>No haz agregado productos a tu carrito</p></div>
       `)
    }
    for (i of carrito.getCarrito) {
      $("#productosCarrito").append(
        `
                 <div class="col-2">
                     <img src="${i.imagen}" alt="${i.nombre.toLowerCase()}" class="img-fluid">
                 </div>
                 <div class="col-2"><p>${i.nombre}</p></div>
                 <div class="col-2"><p>$${i.precio}</p></div>
                 <div class="col-2"><p>${i.cantidad}</p></div>
                 <div class="col-2"><p class="font-weight-bold">$${(i.cantidad * i.precio).toFixed(2)}</p></div>
                 <div class="col-2"><button class="btnEliminar"><i class="fas fa-trash" id="eliminarProducto" data-producto="${i.id}"></i></button></div>
                `
      );

       
    }
  }


  this.renderCarritoCompra = function () {
    // $(".productosCompra").html("");
    for (i of carrito.getCarrito) {
      $(".productosCompra tbody").append(
        `         
        
        <tr>
                                        <td data-producto="${i.id}"><img src="../${i.imagen}" alt="${i.nombre.toLowerCase()}" class="img-fluid"></td>
                                        <td><p>${i.nombre}</p></td>
                                        <td><span class="precioCompra">$${i.precio}</span></td>
                                        <td><p>${i.cantidad}</p></td>
                                        <td><strong>$${(i.cantidad * i.precio).toFixed(2)}</strong></td>
                                        <td><button class="btnEliminarCompra"><i class="fas fa-trash" id="eliminarProducto" data-producto="${i.id}"></i></button></td>
                                        
                                      </tr>
                
                     
                 
                 
                 
                
                 
                
                `
      );
    }
  }
    //   $("body").prepend(`

                                  
     
    //   <div class="rectangulo">
    //       <div class="textoNotificacion">
    //       <i class="fas fa-exclamation-circle"></i>
    //           <span>&nbsp;&nbsp;Producto agregado al carrito</span>
    //       </div>
    //   </div>
      
    //   `)

    this.notificacion = function (mensaje, color) {
        const randomId = Math.random().toString(36).substring(7);
        $(".contenedorNotificacion").append(`<div class="rectangulo" id="${randomId}" style="display: none">
        <div class="textoNotificacion">
        <i class="fas fa-exclamation-circle"></i>
        <span>&nbsp;&nbsp;${mensaje}</span>
        </div>
        </div>`);

        $(".rectangulo").css("background-color", color).fadeIn(600).delay(4000).fadeOut(600, () => {
            $(`#${randomId}`).remove();
        });

        // $("#randomId").fadeIn().delay(5000).hide();

        // $(`#${randomId}`).show().delay(5000).hide(); //.delay(5000).hide();
    }
 
    //     // aparece y desaparece la notificacion
    //     $(`#${randomId}`).css("background-color", color).show();
    //     // $(`#${randomId}`).css("background-color", color).fadeIn(600).delay(5000).fadeOut(600, () => {
    //     //     $(`#${randomId}`).remove();
    //     // });
    // }


    // $("#totalCarrito").html("");
    $("#totalCarrito").append(`$ ${carrito.getTotal()}`);
    // $(".totalesCompra .totalCompras").html("");
    // $(".totalesCompra .totalCompras").append(` $${carrito.getTotal()}`);
    $(".recuadroGris").append(` $${carrito.getTotal()}`);
  
    // $("#totalCarrito").innerHTML = "$"+carrito.getTotal();
    console.log(carrito.getTotal());
  

  // Se calcula el total de todos los productos elegidos
  this.totalProductos = function () {
    let total = carrito.getCarrito.reduce(contarCarrito, 0);
    console.log(total);
    // contador.innerHTML = total;
    $("#contador").html("");
    $("#contador").append(total);
    // $(".totalesCompra .cantidadTotal").append(`${total}`);
  };

  this.totalProductosCompra = function () {
    let total = carrito.getCarrito.reduce(contarCarrito, 0);
    console.log(total);
    // contador.innerHTML = total;
    // $(".totalesCompra .cantidadTotal").html("CANT. TOTAL:   ");  Este si VA
    $(".recuadroGrisCant").html("");
    // $(".totalesCompra .cantidadTotal").append(`${total}`);
    // $(".totalesCompra .cantidadTotal").append(`${total}`); Este taambien VA

    $(".recuadroGrisCant").append(`${total}`);
  };




}

let carrito = new Carrito();
let carrito_view = new Carrito_View();

// Funcion para contar los productos que hay en el carrito
function contarCarrito(acumulador, producto) {
  return acumulador + producto.cantidad;
}

// Se dispara el evento click, al presionar el boton "Agregar"
$("#listaProductos").on("click", function (ev) {
  ev.preventDefault();
  if (ev.target.id === "agregarProducto") {
    let id = ev.target.dataset.producto;

    carrito.agregarItem(id);

    carrito_view.renderCarrito();
    carrito_view.totalProductos();
    $("#totalCarrito").html("");
    $("#totalCarrito").append(`$ ${carrito.getTotal()}`);
    carrito_view.notificacion("Se agregó el producto al carrito", "green");
    
   
  }
});

// Se dispara el evento click al presionar el icono de "Eliminar"


$("#productosCarrito").on("click", function (ev) {
  ev.preventDefault();
  if (ev.target.id === "eliminarProducto") {
    carrito.eliminarItem(ev.target.dataset.producto);
    carrito_view.renderCarrito();
    carrito_view.totalProductos();
    $("#totalCarrito").html("");
    $("#totalCarrito").append(`$ ${carrito.getTotal()}`);
    carrito_view.notificacion("Se eliminó el producto del carrito", "#FF063D");
  }
});

$(".productosCompra tbody").on("click", function (ev) {
  ev.preventDefault();
  
  if (ev.target.id === "eliminarProducto") {
    // carrito.eliminarItem(ev.target.dataset.producto);
    carrito.eliminarItem(ev.target.dataset.producto);
    ev.target.parentElement.parentElement.parentElement.remove();
    carrito_view.totalProductosCompra();
    // $(".totalesCompra .totalCompras").html("");
    // $(".totalesCompra .totalCompras").append(`TOTAL: ${carrito.getTotal()}`);
    $(".recuadroGris").html("");
    $(".recuadroGris").append(`${carrito.getTotal()}`);
    
   }
});



$("#realizarCompra").on("click", function (ev) {
  ev.preventDefault();
  let cliente = $("#cliente").val();
  let email = $("#email").val();
  if(carrito.getCarrito.length <= 0){
    alert("No haz agregado ningún producto al carrito");
  }

else if (cliente === '' || email === ''){
    Swal.fire({
      icon: 'warning',
      title: 'Oops...',
      text: 'Ingrese todos los campos requeridos',
      timer: 2000,
      showConfirmButton: false
    })

  }
else{
  

  alert("Gracias por tu compra, " + cliente + "! " + "En instantes te llegará el detalle de la misma a: " + email);
  // finalizar();
  
  $(".productosCompra tbody").fadeOut(2000);
  carrito = [];
  $(".recuadroGrisCant").html("");
  $(".recuadroGris").html("");
  $("#totalCarrito").html("");
  $("#listaProductos").remove();
  localStorage.setItem("carrito", "[]");

  setTimeout(() =>{

   window.location = "../index.html";

  }, 2000);

}

});

// function finalizar(ev){
//   $(".productosCompra tbody").fadeOut(2000);
//   // $(".recuadroGrisCant").html("");
//   // $(".recuadroGris").html("");
//   // $("#totalCarrito").html("");
   
   
// }

