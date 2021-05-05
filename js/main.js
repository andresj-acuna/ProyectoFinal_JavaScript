// Funcion para agregar producto

function agregarProducto(producto){


  $("#listaProductos").append( 
    `
    <li>
      <div class="card" id="${producto.id}" category="${producto.categoria}"> 
        <img src=${producto.imagen} class="card-img-center img-fluid" alt="${producto.nombre.toLowerCase()}">
      <div class="card-body">
        <p>${producto.nombre}</p>
        <span>ARS $${producto.precio}</span>
        <a href="#" class="btn btn-primary" id="agregarProducto" data-producto="${producto.id}">Agregar</a>
      </div>
      </div>
    </li>`
  );
  
  $(".categoryItems").html(`
  <li><a href="javascript:location.reload()" id="categoryItem" category="todos">Ver todos</a></li>
  <li><a href="javascript:location.reload()" id="categoryItem" category="procesador">Microprocesadores</a></li>
  <li><a href="javascript:location.reload()" id="categoryItem" category="memoria">Memorias</a></li>
  <li><a href="javascript:location.reload()" id="categoryItem" category="motherboard">Motherboards</a></li>
  <li><a href="javascript:location.reload()" id="categoryItem" category="gpu">Placas de Video</a></li>
  `);
  
}



// Se borran los productos al buscar

function borrarProductos(){
  $("#listaProductos").html("");
  // $("#listaProductos").hide();
  
}

// Se guardan los productos buscados en el LocalStorage

function guardarBusqueda(busqueda){
  localStorage.setItem("busqueda", busqueda);
}


// Funcion para filtrar productos por nombre

let buscarProductos = (e) => {
    
  borrarProductos();

  const filtrarProductos = productos.filter((p => p.nombre.toLowerCase().includes((e.target.value.toLowerCase()))) || (p => p.nombre.toLowerCase().includes((e.target.value.toUpperCase()))));
    
    for(let producto of filtrarProductos){
    
    agregarProducto(producto);
    
    guardarBusqueda(e.target.value);
  }
}




// $(".categoryItems #categoryItem").click(function(){
//   let categoriaProducto = $(this).attr("category");
//   // console.log(catProducto);

  

//   $(".card").hide();
//   // $(".card").css("transform", "scale(0)");
//   // function ocultarProductos(){
//   //     $(".card").hide();
//   // } setTimeout(ocultarProductos,400);
//   $('.card[category="'+categoriaProducto+'"]').fadeIn(3000);

//   // function mostrarProductos(){
//   //    $('.card[category="'+categoriaProducto+'"]').show();
//   //    $('.card[category="'+categoriaProducto+'"]').css("transform", "scale(1)");
//   // } setTimeout(mostrarProductos, 400);
 
// });
 
// $('#categoryItem[category="todos"]').click(function(){ 
//   //  function mostrarTodos(){
//        $(".card").fadeIn(3000);
//   //      $(".card").css("transform", "scale(1)");

//   //  } setTimeout(mostrarTodos, 400);
 

// });



// Filtrar por categoria al hacer click

$(".categoryItems #categoryItem").click(function(){

    let categoriaProducto = $(this).attr("category");
              
    $(".card").hide();
            
    $('.card[category="'+categoriaProducto+'"]').fadeIn(1200);
            
    });
            
    $('#categoryItem[category="todos"]').click(function(){ 
              
    $(".card").fadeIn(1200);
            
    });
        


// Filtrar por checkbox

// function filtradoCheckbox(){
//   let filtrarCheckbox = $(".marcas");
//   console.log(filtrarCheckbox);
//   if (o.checked) {g.style.display = 'block'}
//   else {g.style.display = 'none'}
//   }

// $('#cbox1').click(function(){
//   let marcaProducto = $(this).attr("value");
  
//   $(".card").hide();

//   if ( $("input[type=checkbox]").prop("checked") ) {
//     $('.card[marca="'+marcaProducto+'"]').fadeIn(1200);
//     console.log(marcaProducto);
//   }
   
// });

// $(".marcas li input").click(function(){
//   let marcaProducto = $(this).attr("value");
//   console.log(marcaProducto);
//   $(".card").hide();

//   switch(marcaProducto){
//     case "amd": 
//     $('#cbox1').click(function(){
        
        
//         $(".card").hide();
      
//         if ( $("input[type=checkbox]").prop("checked") ) {
//           $('.card[marca="'+marcaProducto+'"]').show();
//           console.log(marcaProducto);
//         }
         
//       });
  
//         break;
  
//     case "intel":
     

//       $('#cbox2').click(function(){
        
        
      
       
      
//         if ( $("input[type=checkbox]").prop("checked") ) {
//           $('.card[marca="'+marcaProducto+'"]').show();
//           console.log(marcaProducto);
//         }
         
//       });
//        break;
  
//        default: console.log("Nikoyi")
  
//   }


// });









// if ($('.marcas #cbox1').prop('checked') ) {
//   console.log("Checkbox seleccionado");
// }



// Evento para buscar productos al hacer click

$("#producto").change((e) =>{
  buscarProductos(e);
});