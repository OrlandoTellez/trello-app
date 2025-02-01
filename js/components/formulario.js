import { EVENT_CLICK, EVENT_SUBMIT } from "../utils/consts.js"
import { renderCard } from "./card.js"

export function renderFormCreate(containerInput, btnAddCard) {
    containerInput.innerHTML = `
        <form class="form-crear--tarjeta">
            <input type="text" class="input-agregar--tarjeta" placeholder="Agregue una nueva tarea...">
            <textarea class="text-area--agregar" placeholder="Agregue una descripción"></textarea>
            <div>
                <button type="submit" class="btn-crear--tarjeta">Añadir tarjeta</button>
                <button type="button" class="btn-cancelar">Cancelar</button>
            </div>
        </form>
    `

    eventoForm(containerInput, btnAddCard)
}

function eventoForm(containerInput, btnAddCard) {
    const formCrearTarjeta = containerInput.querySelector(".form-crear--tarjeta")
    const btnCancelar = containerInput.querySelector(".btn-cancelar")
    const inputAgregarTarjeta = containerInput.querySelector(".input-agregar--tarjeta")
    const textAreaAgregar = containerInput.querySelector(".text-area--agregar")

    formCrearTarjeta.addEventListener(EVENT_SUBMIT, (e) => {
        e.preventDefault()
        const tarea = inputAgregarTarjeta.value.trim()
        const descripcion = textAreaAgregar.value.trim()

        if (tarea) {
            renderCard(tarea, descripcion, containerInput.closest(".column"))
            containerInput.innerHTML = ""
            btnAddCard.style.display = "block"
        } else {
            alert("Por favor escriba una tarea")
        }
    })

    btnCancelar.addEventListener(EVENT_CLICK, () => {
        containerInput.innerHTML = ""
        btnAddCard.style.display = "block"
    })
}


export function renderFormEdit(titulo, descripcion, columna, tarjeta) {
    const containerEdit = columna.querySelector(".container-edit")

    containerEdit.innerHTML = `
        <form class="form-edit--tarjeta">
            <div class="edit">
                <input class="input-tarea--edit" type="text" value="${titulo}" placeholder="Edite el título">
                <textarea class="text-area--descripcion" placeholder="Agregue una descripción">${descripcion}</textarea>
            </div>
            <div class="buttons-edit">
                <button type="submit" class="btn-guardar--cambios">Save</button>
                <button type="button" class="btn-cancelar">Cancel</button>
            </div>
        </form>
    `

    const formularioEdit = containerEdit.querySelector(".form-edit--tarjeta")
    const inputTarea = containerEdit.querySelector(".input-tarea--edit")
    const textAreaDescripcion = containerEdit.querySelector(".text-area--descripcion")
    const btnCancelar = containerEdit.querySelector(".btn-cancelar")

    formularioEdit.addEventListener(EVENT_SUBMIT, (e) => {
        e.preventDefault()
        containerEdit.innerHTML = ""
        tarjeta.querySelector(".titulo-tarea").textContent = inputTarea.value
        tarjeta.querySelector(".descripcion-tarea").textContent = textAreaDescripcion.value
        tarjeta.style.display = "flex"
    })

    btnCancelar.addEventListener(EVENT_CLICK, () => {
        containerEdit.innerHTML = ""
        tarjeta.style.display = "flex"
    })
}