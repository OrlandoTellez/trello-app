import { EVENT_CLICK, EVENT_BLUR, EVENT_KEYPRESS } from "../utils/consts.js"
import { agregarEventosArrastre} from "./dragAndDrop.js"
import { renderFormCreate } from "./formulario.js"
import { renderCard } from "./card.js"

const tablero = document.querySelector(".board")

export function renderLista(nombreLista = "Nueva lista") {
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
            saveBoardState()
        }
    })

    inputEdit.addEventListener(EVENT_BLUR, () => {
        editNameLista.textContent = inputEdit.value.trim() || "Nueva lista"
        inputEdit.style.display = "none"
        editNameLista.style.display = "block"
        saveBoardState()
    })

    addCart.addEventListener(EVENT_CLICK, () => {
        addCart.style.display = "none"
        renderFormCreate(containerInput, addCart)
    })

    iconoBorrar.addEventListener(EVENT_CLICK, () => {
        tablero.removeChild(div)
        saveBoardState()
    })

    div.dataset.columnRef = true
}

export function saveBoardState() {
    const columns = document.querySelectorAll(".column")
    const boardState = []

    columns.forEach(column => {
        const columnName = column.querySelector(".edit-name--lista").textContent
        const cards = column.querySelectorAll(".card")
        const cardState = []

        cards.forEach(card => {
            const cardTitle = card.querySelector(".titulo-tarea").textContent
            const cardDescription = card.querySelector(".descripcion-tarea").textContent
            cardState.push({ title: cardTitle, description: cardDescription })
        })

        boardState.push({ name: columnName, cards: cardState })
    })

    localStorage.setItem("boardState", JSON.stringify(boardState))
}

export function loadBoardState() {
    const boardState = JSON.parse(localStorage.getItem("boardState"))

    if (boardState) {
        boardState.forEach(column => {
            renderLista(column.name)
            const currentColumn = tablero.lastElementChild

            column.cards.forEach(card => {
                renderCard(card.title, card.description, currentColumn)
            })
        })
    }
}