const addCart = document.querySelector(".add-card")
const containerInput = document.querySelector(".container-input")
const columna = document.querySelector(".column")
const containerEdit = document.querySelector(".container-edit")
const btnLista = document.querySelector(".btn-agregar--lista")
const tablero = document.querySelector(".board")

btnLista.addEventListener("click", () => {
    renderLista()
})

addCart.addEventListener("click", () => {
    addCart.style.display = "none"
    renderFormCreate()
    eventoForm()
});

function renderLista(){
    const div = document.createElement("div")
    div.classList.add("column")
    div.innerHTML = `
    <h2>To do</h2>
        <div class="container-edit"></div>
        <div class="container-input"></div>
    <button class="add-card">Add card</button>
    `
    tablero.appendChild(div)

    
}

function renderFormCreate() {
    return (containerInput.innerHTML = `
    <form class="form-crear--tarjeta">
        <input type="text" class="input-agregar--tarjeta" placeholder="Agregue una nueva tarea...">
        <textarea class="text-area--agregar" placeholder="Agregue una descripción"></textarea>
        <div>
            <button type="submit" class="btn-crear--tarjeta">Añadir tarjeta</button>
            <button type="button" class="btn-cancelar">Cancelar</button>
        </div>
    </form>
    `)
}

function renderFormEdit(titulo, descripcion) {
    return (containerEdit.innerHTML = `
        <form class="form-edit--tarjeta">
            <div class="edit">
                <input class="input-tarea--edit" type="text" value="${titulo}" placeholder="Edite el titulo">
                <textarea class="text-area--descripcion" placeholder="Agregue una descripcion">${descripcion}</textarea>
            </div>
            <div class="buttons-edit">
                <button type="submit" class="btn-guardar--cambios">Save</button>
                <button type="button" class="btn-cancelar">Cancel</button>
            </div>
        </form>
    `)
}

function eventoForm() {
    const formCrearTarjeta = document.querySelector(".form-crear--tarjeta")
    const btnCancelar = document.querySelector(".btn-cancelar")
    const inputAgregarTarjeta = document.querySelector(".input-agregar--tarjeta")
    const textAreaAgregar = document.querySelector(".text-area--agregar")

    formCrearTarjeta.addEventListener("submit", (e) => {
        e.preventDefault()
        const tarea = inputAgregarTarjeta.value.trim()
        const descripcion = textAreaAgregar.value.trim()

        if (tarea) {
            renderCard(tarea, descripcion)
            containerInput.innerHTML = ""
            addCart.style.display = "block"
        } else {
            alert("Por favor escriba una tarea")
        }
    })

    btnCancelar.addEventListener("click", () => {
        containerInput.innerHTML = ""
        addCart.style.display = "block"
    });
}

function renderCard(tarea, descripcion = "") {
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
    const tituloTareaContainer = nuevaTarjeta.querySelector(".titulo-tarea")
    const descripcionTareaContainer = nuevaTarjeta.querySelector(".descripcion-tarea")

    iconoBorrar.addEventListener("click", () => {
        columna.removeChild(nuevaTarjeta)
    });

    iconoEditar.addEventListener("click", () => {
        nuevaTarjeta.style.display = "none"
        renderFormEdit(tituloTareaContainer.textContent, descripcionTareaContainer.textContent)

        const formularioEdit = document.querySelector(".form-edit--tarjeta")
        const inputTarea = document.querySelector(".input-tarea--edit")
        const textAreaDescripcion = document.querySelector(".text-area--descripcion")
        const btnCancelar = document.querySelector(".btn-cancelar")

        formularioEdit.addEventListener("submit", (e) => {
            e.preventDefault()
            containerEdit.innerHTML = ""
            tituloTareaContainer.textContent = inputTarea.value
            descripcionTareaContainer.textContent = textAreaDescripcion.value
            nuevaTarjeta.style.display = "flex"
        });

        btnCancelar.addEventListener("click", () => {
            containerEdit.innerHTML = ""
            nuevaTarjeta.style.display = "flex"
        });
    });

    columna.appendChild(nuevaTarjeta)
}

