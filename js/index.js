const addCart = document.querySelector(".add-card")
const containerInput = document.querySelector(".container-input")
const inputAñadirTarjeta = document.querySelector(".input-agregar--tarjeta")

addCart.addEventListener("click", (e) => {
    e.preventDefault()
    addCart.style.display = "none"
    renderForm()
})

function renderForm(){
    return containerInput.innerHTML = `
    <form class="form-añadir--tarjeta">
        <input type="text" class="input-agregar--tarjeta" placeholder="Agregue una nueva tarea...">
        <div>
            <button class="add-card">Añdir tarjeta</button>
            <button class="btn-cancelar">Cancelar</button>
        </div>
    </form>
    `
}

