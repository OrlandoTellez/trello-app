import { EVENT_CLICK } from "./utils/consts.js"
import { renderLista } from "./components/lista.js"

const btnLista = document.querySelector(".btn-agregar--lista")

btnLista.addEventListener(EVENT_CLICK, () => {
    renderLista()
})

