function insertFrom(document, elements){
   document.innerHTML = `<form class="config_card" id="create_category">
      ${elements}

      <div class="config_buttons">
         <button id="btn_cancel_c" class="button_cancel" type="button">Cancelar</button>
         <button class="button_save" type="submit">Guardar</button>
      </div>
      <span id="config_close" class="material-symbols-outlined config_close">close</span>
   </form>`
}
export default insertFrom