import LinksNote from "./categories.js";
let categories = LinksNote.categories

function insertWebs(document){
   document.innerHTML = categories.sort((a,b)=> a.position - b.position).map((mc, psc)=> mc.webs.sort((a,b)=> a.position - b.position).map(m=> `<div class="web_page category-${psc+1}" title="${m.description}" data-catId="${mc.id}" data-id="${m.id}">
   <button class="btn_web">
      <span class="material-symbols-outlined btn_icon">settings</span>
   </button>
   <div class="settings">
      <p id="edit_web"><span class="material-symbols-outlined">edit</span> Editar sitio web</p>
      <p id="delete_web"><span class="material-symbols-outlined">delete</span> Eliminar</p>
   </div>
   <a class="contain_img" href="${m.url}" target="_blank">
   <img src="https://www.google.com/s2/favicons?domain=${m.url}" alt="${m.name}">
   </a>
   <a href="${m.url}" target="_blank" title="${m.description}">
   <p class="web_title">${m.name}</p>
   </a>
   </div>`).join("")).join("")
   // <img src="${m.url}/favicon.ico" alt="${m.name}">
   // <img src="https://www.google.com/s2/favicons?domain=${m.url}" alt="${m.name}">
}

function editWeb(catId, webId, name, desc, url, pos){
   const res = confirm("⚠️ ¿Seguro que quieres editar la web?")
   if(res){
      let web = getWeb(catId, webId)
      web.name = name
      web.description = desc
      if(web.position != pos){
         let categoria = categories.find(f=> f.id==catId), segWeb = categoria.webs.find(f=> f.position==pos)
         segWeb.position = web.position
         web.position = pos
      }
      web.url = url
      localStorage.setItem("LinksNote", JSON.stringify(LinksNote))
   }
}

function deleteWeb(catId, webId){
   let categoria = categories.find(f=> f.id==catId), web = getWeb(catId, webId)
   const res = confirm(`⚠️ Seguro que quieres eliminar la web ${web.name} con la descripción (${web.description})?`) 
   if(res){
      categoria.webs.splice(categoria.webs.findIndex(f=> f.id==webId), 1)
      localStorage.setItem("LinksNote", JSON.stringify(LinksNote))
   }
}

function getWeb(catId, webId){
   return categories.find(f=> f.id==catId).webs.find(f=> f.id==webId)
}

export {insertWebs, editWeb, deleteWeb, getWeb}