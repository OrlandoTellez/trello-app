import { EVENT_CLICK, EVENT_SUBMIT, EVENT_BLUR, EVENT_KEYPRESS } from "./utils/consts.js"
import { renderFormEdit } from "./components/formulario.js"	


const btnLista = document.querySelector(".btn-agregar--lista")
const tablero = document.querySelector(".board")

btnLista.addEventListener(EVENT_CLICK, () => {
    renderLista()
})

function renderLista(nombreLista = "Nueva lista") {
    const div = document.createElement("div")
    div.classList.add("column")
    div.setAttribute("draggable", "true")
    div.innerHTML = `
        <div class="drag-container--icon">
            <img class="drag" src="./assets/icons/drag.svg">
        </div>
        <article class="article-text">    
            <p class="edit-name--lista">${nombreLista}</p>
            <textarea class="input-edit"></textarea>
            <img class="icono-borrar" src="./assets/icons/trash.svg" alt="delete-icon">
        </article>
        <div class="container-edit"></div>
        <div class="container-input"></div>
        <button class="add-card">Add card</button>
    `
    tablero.appendChild(div)

    div.querySelectorAll("img, button, textarea").forEach((elemento) => {
        elemento.setAttribute("draggable", "false")
    })
    agregarEventosArrastre(div)


    const iconoBorrar = div.querySelector(".icono-borrar")
    const containerInput = div.querySelector(".container-input")
    const addCart = div.querySelector(".add-card")
    const editNameLista = div.querySelector(".edit-name--lista")
    const inputEdit = div.querySelector(".input-edit")

    editNameLista.addEventListener(EVENT_CLICK, () => {
        inputEdit.style.display = "block"
        inputEdit.value = editNameLista.textContent
        editNameLista.style.display = "none"
        inputEdit.focus()
        inputEdit.select()
    })

    inputEdit.addEventListener(EVENT_KEYPRESS, (e) => {
        if (e.key === "Enter") {
            e.preventDefault()
            editNameLista.textContent = inputEdit.value.trim() || "Nueva lista"
            inputEdit.style.display = "none"
            editNameLista.style.display = "block"
        }
    })

    inputEdit.addEventListener(EVENT_BLUR, () => {
        editNameLista.textContent = inputEdit.value.trim() || "Nueva lista"
        inputEdit.style.display = "none"
        editNameLista.style.display = "block"
    })

    addCart.addEventListener(EVENT_CLICK, () => {
        addCart.style.display = "none"
        renderFormCreate(containerInput, addCart)
    })

    iconoBorrar.addEventListener(EVENT_CLICK, () => {
        tablero.removeChild(div)
    })

    div.dataset.columnRef = true
}

function agregarEventosArrastre(lista) {
    lista.addEventListener("dragstart", (e) => {
        e.target.classList.add("dragging") 
    })

    lista.addEventListener("dragend", (e) => {
        e.target.classList.remove("dragging")
    })

    tablero.addEventListener("dragover", (e) => {
        e.preventDefault() 
        const afterElement = obtenerElementoDespuesDelCursor(tablero, e.clientX)
        const listaArrastrada = document.querySelector(".dragging")

        if (afterElement == null) {
            tablero.appendChild(listaArrastrada)
        } else {
            tablero.insertBefore(listaArrastrada, afterElement)
        }
    })
}

function obtenerElementoDespuesDelCursor(tablero, x) {
    const columnas = [...tablero.querySelectorAll(".column:not(.dragging)")]

    return columnas.reduce((closest, child) => {
        const box = child.getBoundingClientRect()
        const offset = x - box.left - box.width / 2

        if (offset < 0 && offset > closest.offset) {
            return { offset, element: child }
        } else {
            return closest
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element
}


function renderFormCreate(containerInput, btnAddCard) {
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

function renderCard(tarea, descripcion, columna) {
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


renderFormEdit(titulo, descripcion, columna, tarjeta)