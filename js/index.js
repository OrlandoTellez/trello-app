const addCart = document.querySelector(".add-card")
const containerInput = document.querySelector(".container-input")
const columna = document.querySelector(".column")
const containerEdit = document.querySelector(".container-edit")

addCart.addEventListener("click", () => {
    addCart.style.display = "none"
    renderFormCreate()
    eventoForm()
})

function renderFormCreate(){
    return containerInput.innerHTML = `
    <form class="form-crear--tarjeta">
        <input type="text" class="input-agregar--tarjeta" placeholder="Agregue una nueva tarea...">
        <div>
            <button type="submit" class="btn-crear--tarjeta">Añadir tarjeta</button>
            <button type="button" class="btn-cancelar">Cancelar</button>
        </div>
    </form>
    `
}

function renderFormEdit(tarea){
    return containerEdit.innerHTML = `
        <form class="form-edit--tarjeta">
            <div class="edit">
                <input type="text" placeholder="Edite el titulo" value="${tarea}">
                <textarea placeholder="Agregue una descripcion"></textarea>
            </div>
            <div class="buttons-edit">
                <button type="submit" class="btn-guardar--cambios">Save</button>
                <button type="button" class="btn-cancelar">Cancel</button>
            </div>
        </form>
    `
}

function eventoForm(){
    const formCrearTarjeta = document.querySelector(".form-crear--tarjeta")
    const btnCancelar = document.querySelector(".btn-cancelar")
    const inputAgregarTarjeta = document.querySelector(".input-agregar--tarjeta")
    
    formCrearTarjeta.addEventListener("submit", (e) => {
        e.preventDefault()
        const tarea = inputAgregarTarjeta.value.trim()
        if(tarea){
            renderCard(tarea)
            containerInput.innerHTML = "";
            addCart.style.display = "block"
        }else{
            alert("Por favor escriba una tarea")
        }
    })

    btnCancelar.addEventListener("click", () => {
        containerInput.innerHTML = ""
        addCart.style.display = "block"
    })
}

function renderCard(tarea){
    const nuevaTarjeta = document.createElement("div")
    nuevaTarjeta.classList.add("card")
    nuevaTarjeta.innerHTML = `
        <article>
            <h3>${tarea}</h3>
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
        renderFormEdit(tarea)

        const btnCancelar = document.querySelector(".btn-cancelar")
        
        btnCancelar.addEventListener("click", () => {
            containerEdit.innerHTML = ""
            nuevaTarjeta.style.display = "flex"
        })

    })

    columna.appendChild(nuevaTarjeta)

}

