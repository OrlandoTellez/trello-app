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

    formularioEdit.addEventListener(EVENT_SUBMIT, (e) => {
        e.preventDefault()
        containerEdit.innerHTML = ""
        tarjeta.querySelector(".titulo-tarea").textContent = inputTarea.value
        tarjeta.querySelector(".descripcion-tarea").textContent = textAreaDescripcion.value
        tarjeta.style.display = "flex"
    })

    btnCancelar.addEventListener(EVENT_CLICK, () => {
        containerEdit.innerHTML = ""
        tarjeta.style.display = "flex"
    })
}

export { renderFormEdit }