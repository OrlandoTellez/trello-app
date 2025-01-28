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
            <button type="button" class="btn-crear--tarjeta">Añadir tarjeta</button>
            <button type="button" class="btn-cancelar">Cancelar</button>
        </div>
    </form>
    `
}

function eventoForm(){
    const btnAgregarTarjeta = document.querySelector(".btn-crear--tarjeta")
    const btnCancelar = document.querySelector(".btn-cancelar")
    const inputAgregarTarjeta = document.querySelector(".input-agregar--tarjeta")
    
    btnAgregarTarjeta.addEventListener("click", () => {
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
        <h3>${tarea}</h3>
    `
    columna.appendChild(nuevaTarjeta)
}

