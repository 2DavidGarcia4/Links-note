let LinksNote = JSON.parse(localStorage.getItem("LinksNote")) || {}
LinksNote.categories ? null : LinksNote.categories = []
LinksNote.darkMode ? null : LinksNote.darkMode = false
let categories = LinksNote.categories

function insertCatHtml(document){
   document.innerHTML = categories.sort((a,b)=> a.position - b.position).map((m, ps)=> `<li data-id="${m.id}">
      <div class="cat_config" data-id="${m.id}">
         <p id="edit_cat"><span class="material-symbols-outlined">edit</span> Editar categoría</p>
         <p id="add_web"><span class="material-symbols-outlined">add</span> Agregar web</p>
         <p id="del_cat"><span class="material-symbols-outlined">delete</span> Eliminar</p>
      </div>
      <div class="categorie" data-filter=".category-${ps+1}" style="background-color: ${m.color};" title="${m.description}">
         <h4>${m.name}</h4>
         <span>${m.webs.length}</span>
      </div>
   </li>`).join("")
}

function createCategorie(name, desc, color){
   if(categories.some(s=> s.name == name)) return alert("⚠️ El nombre de la nueva categoría ya lo tiene otra categoria.")
   if(categories.some(s=> s.description == desc)) return alert("⚠️ La descripción de la nueva categoria es igual a la de una categoría ya existente.")
   let id = 0, bueltas = 1
   for(let r=0; r<bueltas; r++){
      let random = Math.floor(Math.random()*888) + 111
      categories.some(s=> random == s.id) ? bueltas++ : id = random
   }
   let pos = categories.length == 0 ? 1 : categories.sort((a,b)=> b.position-a.position)[0].position+1
   categories.push({id: id, name: name, description: desc, color: color, position: pos, webs: []})
   localStorage.setItem("LinksNote", JSON.stringify(LinksNote))
}

function updateCategorie(id, name, desc, pos, color){
   let categoria = categories.find(f=> f.id == id)
   if(categories.filter(f=> f.id != id).some(s=> s.name == name)) return alert("⚠️ El nuevo nombre de la categoría ya lo tiene otra categoria.")
   if(categories.filter(f=> f.id != id).some(s=> s.description == desc)) return alert("⚠️ La descripción de la nueva categoria es igual a la de una categoría ya existente.")
   const res = confirm("⚠️ ¿Seguro que quieres editar la categoría?") 
   if(res){
      categoria.name = name
      categoria.description = desc
      if(categoria.position != pos){
         let segCat = categories.find(f=> f.position == pos)
         segCat.position = categoria.position
         categoria.position = pos
      }
      categoria.color = color
      localStorage.setItem("LinksNote", JSON.stringify(LinksNote))
   }
}

function addWeb(catId, name, desc, url){
   let categoria = categories.find(f=> f.id==catId), value = true
   categories.forEach(cat=> {
      if(cat.webs.some(s=> s.name == name)){
         alert(`⚠️ El nombre (${name}) de la nueva página web ya lo tiene otra web, dale otro nombre.`)
         return value = false
      }
      if(cat.webs.some(s=> s.description == desc)){
         alert(`⚠️ La descripción (${desc}) de la nueva página web ya la tiene otra web, dale otra descripción.`)
         return value = false
      }
      if(cat.webs.some(s=> s.url == url)){
         alert(`⚠️ La url (${url}) de la nueva página web ya la tiene otra web.`)
         return value = false
      }
   })

   if(value){
      const res = confirm(`❓ ¿Seguro que quieres crear la web ${name} con la descripción (${desc}) en la categoría ${categoria.name}?`)
      if(res){
         let webId = 0, bueltas = 1
         for(let r=0; r<bueltas; r++){
            let random = Math.floor(Math.random()*888) + 111
            categoria.webs.some(s=> random == s.id) ? bueltas++ : webId = random
         }
         let pos = categoria.webs.length == 0 ? 1 : categoria.webs.sort((a,b)=> b.position-a.position)[0].position+1
         categoria.webs.push({id: webId, name: name, description: desc, url: url, position: pos})
         localStorage.setItem("LinksNote", JSON.stringify(LinksNote))
      }
   }
}

function deleteCategorie(id){
   let categoria = categories.find(f=> f.id==id)
   const res = confirm(`⚠️ Seguro que quieres eliminar la categoría ${categoria.name} la cual contiene ${categoria.webs.length} webs?`) 
   if(res){
      categories.splice(categories.findIndex(f=> f.id==id), 1)
      localStorage.setItem("LinksNote", JSON.stringify(LinksNote))
   }
}

function getCategorie(id){
   return categories.find(f=> f.id == id)
}

export {insertCatHtml, createCategorie, updateCategorie, addWeb, deleteCategorie, getCategorie}
export default LinksNote