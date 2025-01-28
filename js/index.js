const addCart = document.querySelector(".add-card")
const containerInput = document.querySelector(".container-input")
const inputAñadirTarjeta = document.querySelector(".input-agregar--tarjeta")
const columna = document.querySelector(".column")

addCart.addEventListener("click", () => {
    addCart.style.display = "none"
    renderForm()
    eventoForm()
})



function renderForm(){
    return containerInput.innerHTML = `
    <form class="form-añadir--tarjeta">
        <input type="text" class="input-agregar--tarjeta" placeholder="Agregue una nueva tarea...">
        <div>
            <button class="btn-crear--tarjeta">Añadir tarjeta</button>
            <button class="btn-cancelar">Cancelar</button>
        </div>
    </form>
    `
}

function eventoForm(){
    const btnAgregarTarjeta = document.querySelector(".btn-crear--tarjeta")

    btnAgregarTarjeta.addEventListener("click", () => {
        renderCard()
    })
}

function renderCard(){
    return columna.innerHTML = `
    <div class="card">
        <h3>Fix layout: User-Detail Page</h3>
        <p>Sketch attached</p>
    </div>
    `
}

