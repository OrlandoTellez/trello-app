const btnLista = document.querySelector(".btn-agregar--lista")
const tablero = document.querySelector(".board")

btnLista.addEventListener("click", () => {
    renderLista()
})

function renderLista(nombreLista = "Nueva lista") {
    const div = document.createElement("div")
    div.classList.add("column")
    div.innerHTML = `
        <article class="article-text">
                
                <h2>${nombreLista}</h2>
            <img class="icono-borrar" src="/assets/icons/trash.svg" alt="delete-icon">
        </article>
        <div class="container-edit"></div>
        <div class="container-input"></div>
        <button class="add-card">Add card</button>
    `
    tablero.appendChild(div)

    const iconoBorrar = div.querySelector(".icono-borrar")
    const containerEdit = div.querySelector(".container-edit")
    const containerInput = div.querySelector(".container-input")
    const addCart = div.querySelector(".add-card")

    addCart.addEventListener("click", () => {
        addCart.style.display = "none"
        renderFormCreate(containerInput, addCart)
    })

    iconoBorrar.addEventListener("click", () => {
        tablero.removeChild(div)
    })

    div.dataset.columnRef = true
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

    formCrearTarjeta.addEventListener("submit", (e) => {
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

    btnCancelar.addEventListener("click", () => {
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
            <img class="icono-editar" src="/assets/icons/edit.svg" alt="edit-icon">
            <img class="icono-borrar" src="/assets/icons/trash.svg" alt="delete-icon">
        </div>
    `

    const iconoEditar = nuevaTarjeta.querySelector(".icono-editar")
    const iconoBorrar = nuevaTarjeta.querySelector(".icono-borrar")

    iconoBorrar.addEventListener("click", () => {
        columna.removeChild(nuevaTarjeta)
    })

    iconoEditar.addEventListener("click", () => {
        nuevaTarjeta.style.display = "none"
        renderFormEdit(tarea, descripcion, columna, nuevaTarjeta)
    })

    columna.appendChild(nuevaTarjeta)
}

function renderFormEdit(titulo, descripcion, columna, tarjeta) {
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

    formularioEdit.addEventListener("submit", (e) => {
        e.preventDefault()
        containerEdit.innerHTML = ""
        tarjeta.querySelector(".titulo-tarea").textContent = inputTarea.value
        tarjeta.querySelector(".descripcion-tarea").textContent = textAreaDescripcion.value
        tarjeta.style.display = "flex"
    })

    btnCancelar.addEventListener("click", () => {
        containerEdit.innerHTML = ""
        tarjeta.style.display = "flex"
    })
}
