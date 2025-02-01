import { EVENT_CLICK } from "../utils/consts.js"

import { renderFormEdit } from "./formulario.js"

export function renderCard(tarea, descripcion, columna) {
    const nuevaTarjeta = document.createElement("div")
    nuevaTarjeta.classList.add("card")
    nuevaTarjeta.innerHTML = `
        <article>
            <h3 class="titulo-tarea">${tarea}</h3>
            <p class="descripcion-tarea">${descripcion}</p>
        </article>
        <div>
            <img class="icono-editar" src="./assets/icons/edit.svg" alt="edit-icon">
            <img class="icono-borrar" src="./assets/icons/trash.svg" alt="delete-icon">
        </div>
    `

    const iconoEditar = nuevaTarjeta.querySelector(".icono-editar")
    const iconoBorrar = nuevaTarjeta.querySelector(".icono-borrar")

    iconoBorrar.addEventListener(EVENT_CLICK, () => {
        columna.removeChild(nuevaTarjeta)
    })

    iconoEditar.addEventListener(EVENT_CLICK, () => {
        nuevaTarjeta.style.display = "none"
        renderFormEdit(tarea, descripcion, columna, nuevaTarjeta)
    })

    columna.appendChild(nuevaTarjeta)
}
