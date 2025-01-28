const addCart = document.querySelector(".add-card")
const containerInput = document.querySelector(".container-input")
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
    const btnCancelar = document.querySelector(".btn-cancelar")
    const inputAñadirTarjeta = document.querySelector(".input-agregar--tarjeta")
    
    btnAgregarTarjeta.addEventListener("click", () => {
        const tarea = inputAñadirTarjeta.value.trim()
        if(tarea){
            renderCard()
            containerInput.innerHTML = "";
            addCart.style.display = "block"
        }else{
            alert("Por favor escriba una tarea")
        }
    })
}

function renderCard(){
    const nuevaTarjeta = document.createElement("div")
    nuevaTarjeta.classList.add("card")
    nuevaTarjeta.innerHTML = `
        <h3>Fix layout: User-Detail Page</h3>
        <p>Sketch attached</p>
    `
    columna.appendChild(nuevaTarjeta)
}

