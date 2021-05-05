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


// Filtrar por categoria al hacer click

$(".categoryItems #categoryItem").click(function(){

    let categoriaProducto = $(this).attr("category");
              
    $(".card").hide();
            
    $('.card[category="'+categoriaProducto+'"]').fadeIn(1200);
            
    });
            
    $('#categoryItem[category="todos"]').click(function(){ 
              
    $(".card").fadeIn(1200);
            
    });

// Funcion para filtrar marcas a traves de Radiobutton
        
function filtrarRadioButton(){

  let radioButtons = ["radioBtn1", "radioBtn2", "radioBtn3", "radioBtn4", "radioBtn5", "radioBtn6"];
  for ( let i=0;i< radioButtons.length; i++ ){
  if($("#"+radioButtons[i].checked)){
    $("#"+radioButtons[i]).click(function(){
        let marcaProducto = $(this).attr("value");
      
        
        $(".card").hide();
        
        $('.card[marca="'+marcaProducto+'"]').fadeIn(1200);
  
    }
    )};
  
}
}

// Evento para buscar productos al hacer click

$("#producto").change((e) =>{
  buscarProductos(e);
});