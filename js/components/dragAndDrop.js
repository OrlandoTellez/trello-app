const tablero = document.querySelector(".board")

export function agregarEventosArrastre(lista) {
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
