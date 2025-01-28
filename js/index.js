const addCart = document.querySelector(".add-card")
const containerInput = document.querySelector(".container-input")

addCart.addEventListener("click", (e) => {
    e.preventDefault()
    agregarTarjeta()
})

function agregarTarjeta(){
    return containerInput.innerHTML = `
        <input type="text" placeholder="Agregue una nueva tarea...">
    `
}

