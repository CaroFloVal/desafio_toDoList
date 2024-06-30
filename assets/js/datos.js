const listaDeTareas = document.querySelector("#listaTareas");
const input = document.querySelector('#nuevaTarea');
const addBtn = document.querySelector('.btn-add');
const totalTareasElement = document.querySelector('#totalTareas');
const tareasRealizadasElement = document.querySelector('#tareasRealizadas');

let nextId = 4;

const tareas = [
    { id: 1, descripcion: 'Sacar al perro', realizada: false },
    { id: 2, descripcion: 'Comprar utiles', realizada: true },
    { id: 3, descripcion: 'Hacer ejercicio', realizada: false }
];

addBtn.addEventListener("click", (e) => {
    e.preventDefault(); 
    const descripcion = input.value;
    if (descripcion) {  
        tareas.push({ id: nextId++, descripcion: descripcion, realizada: false });
        input.value = "";
        actualizarLista();
    }
});

function actualizarLista() {
    let html = "";
    let tareasRealizadas = 0;

    tareas.forEach(tarea => {
        html += `<li id="tarea-${tarea.id}">
                    <input type="checkbox" ${tarea.realizada ? 'checked' : ''} onchange="toggleTarea(${tarea.id})">
                    <span class="${tarea.realizada ? 'realizada' : ''}">[ID: ${tarea.id}] ${tarea.descripcion}</span>
                    <button onclick="eliminarTarea(${tarea.id})">Eliminar</button>
                 </li>`;
        if (tarea.realizada) tareasRealizadas++;
    });

    listaDeTareas.innerHTML = html;
    totalTareasElement.textContent = tareas.length;
    tareasRealizadasElement.textContent = tareasRealizadas;
}

function toggleTarea(id) {
    const tarea = tareas.find(t => t.id === id);
    if (tarea) {
        tarea.realizada = !tarea.realizada;
        actualizarLista();
    }
}

function eliminarTarea(id) {
    const index = tareas.findIndex(t => t.id === id);
    if (index !== -1) {
        tareas.splice(index, 1);
        actualizarLista();
    }
}


window.toggleTarea = toggleTarea;
window.eliminarTarea = eliminarTarea;


document.addEventListener("DOMContentLoaded", actualizarLista);