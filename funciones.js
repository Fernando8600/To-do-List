let arregloTareas = new Array();
let elementosGuardados = 0;
let tareas = [];
let done= new Audio('done.mp3');
let undone= new Audio('undone.mp3');

function init(){
    if('serviceworker' in navigator){
        navigator.serviceWorker.register('sw.js').then(function(registration){
            console.log('SW registrado correctamente');
        }, function(err){
            console.log('SW fallo',err);
        });
    }
    let fecha = new Date();
    let mesNumero = fecha.getMonth();
    let mes = "";

    switch(mesNumero){
        case 0:
            mes="Enero";
            break;
        case 1:
            mes="Febrero";
            break;
        case 2:
            mes="Marzo";
            break;
        case 3:
            mes="Abril";
            break;
        case 4:
            mes="Mayo";
            break;
        case 5:
            mes="Junio";
            break;
        case 6:
            mes="Julio";
            break;
        case 7:
            mes="Agosto";
            break;
        case 8:
            mes="Septiembre";
            break;
        case 9:
            mes="Octubre";
            break;
        case 10:
            mes="Noviembre";
            break;
        case 11:
            mes="Diciembre";
            break;
    }
    document.getElementById('fecha').innerHTML=fecha.getDate()+" de "+mes;

    //Si ya existen tareas guardadas, emtonces las obtengo en la interfaz 

    if(localStorage.getItem('tareas')){
        alert("Si hay tareas");
        tareas = JSON.parse(localStorage.getItem('tareas'));
        for(i=0; i<tareas.length; i++){
            arregloTareas.push(tareas[i]);
        }
        loadTareas();
        //Hacer funcion para cargar tareas en HTML
    }else{
        alert("No hay tareas");
        jsonTarea={};
        //creamos la variable tareas en el LS y guardamos un objeto vacio (que en realidad ya es texto plano)
        localStorage.setItem('tareas',JSON.stringify(jsonTarea));
    }
}

//Funcion para aggregar pendientes
function agregar(){
    //capturar el elemento de entrada de texto
    tareaTexto = document.getElementById('nuevaTarea');
    //Objeto JS
    jsonTarea = {
        'valor':tareaTexto.value,
        'estatus':'pendiente'
    };
    //Creamos el elemento nuevo en la interfaz 
    elemento =  "<div class='tarea' id='"+i+"'onclick='cambiarEstado(this.id)'"+elementosGuardados+"'>"+
               "<input type='checkbox' id='tarea1'>"+
               "<label for='tarea1'>"+jsonTarea.valor+"</label>"+
               "</div>";

   document.querySelector('.porhacer').innerHTML += elemento;
   arregloTareas.push(jsonTarea);
   localStorage.setItem('tareas', JSON.stringify(arregloTareas));

   tareaTexto.value="";

   elementosGuardados++;
}

function loadTareas(){
    document.querySelector('.porhacer').innerHTML="";
    document.querySelector('.terminado').innerHTML="";
   for(i=0;i<arregloTareas.length;i++){
      console.log(arregloTareas[i])
      elemento =  "<div class='tarea' id='"+i+"'onclick='cambiarEstado(this.id)'"+elementosGuardados+"'>"+
               "<input type='checkbox' id='tarea1'>"+
               "<label for='tarea1'>"+arregloTareas[i].valor+"</label>"+
               "</div>";
      if(arregloTareas[i].estatus="pendiente"){
         document.querySelector('.porhacer').innerHTML += elemento;
      }else if(arregloTareas[i].estatus="terminado"){
         document.querySelector('.terminado').innerHTML += elemento;
      }
   }
   elementosGuardados=tareas.length;
}
function cambiarEstado(id){
    tareas = JSON.parse(localStorage.getItem('tareas'));
    if(tareas[id].estatus=='terminado'){
        tareas[id].estatus='pendiente';
        undone.play();
    }else{
        tareas[id].estatus='terminado';
        done.play();
    }
    
    localStorage.setItem('tareas',JSON.stringify(tareas));
    
    arregloTareas = tareas;
    loadTareas();
}