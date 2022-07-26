import { insertCatHtml, createCategorie, updateCategorie, addWeb, deleteCategorie, getCategorie } from "./src/categories.js"
import { insertWebs, editWeb, deleteWeb, getWeb } from "./src/webs.js"
import { setMode, switchMode } from "./src/darkMode.js"
import insertFrom from "./src/from.js"
// import mixitup from "mixitup"

// const http = new XMLHttpRequest()
// http.open("GET" , "https://uigradients.com/#MidnightCity")
// http.send()
// http.onreadystatechange = (e) =>{
//    console.log(http.responseText.split("<").find(f=> f.includes(`rel=icon`)).split(/ +/g).find(f=> f.includes("href=")))
// }

const body = document.querySelector("body")
const load = document.getElementById("load")
const loadImg = document.getElementById("load_img")
const nav = document.querySelector("nav")
const openCategories = document.getElementById("open_categories")
const closeCategories = document.getElementById("close_categories")
const categories = document.getElementById("categories"), opAndClo = [openCategories, closeCategories]
const listCategories = document.querySelector(".list_categories")
const addCategorie = document.querySelector(".add_categorie")
const navSwitch = document.getElementById("nav_switch")
const switchCircle = document.getElementById("switch_circle")
const temeMode = document.getElementById("teme_mode")

setTimeout(()=>{
   loadImg.style.transform = "translateY(0)"
   setTimeout(()=>{
      loadImg.style.transform = "translateX(-60px) rotate(-360deg)"
      let derecha = false
      let intervalo = setInterval(()=>{
         if(derecha){
            loadImg.style.transform = "translateX(-60px) rotate(-360deg)"
            derecha = false
         }else{
            loadImg.style.transform = "translateX(60px) rotate(0)"
            derecha = true
         }
      }, 1500)
      setTimeout(()=>{
         clearInterval(intervalo)
         loadImg.style.transform = "translateX(0) rotate(0)"
         setTimeout(()=>{
            loadImg.style.transform = "translateY(-100px)"
            setTimeout(()=>{
               load.style.display = "none"
            }, 1000)
         }, 800)
      }, 4500)
   }, 800)
}, 1000)

setMode(body)
insertCatHtml(listCategories)
const container = document.getElementById("container")
insertWebs(container)

body.addEventListener("click", (event)=> {
   if(categories.classList.contains("open_categorie") && (event.target == body)){
      categories.classList.remove("open_categorie")
   }
})

document.addEventListener("scroll", ()=>{
   nav.classList.toggle("nav_active", window.scrollY >= 100)
})

navSwitch.addEventListener("click", ()=>{
   body.classList.toggle("dark_teme")
   switchMode(body.classList.contains("dark_teme"))
   if(body.classList.contains("dark_teme")){
      switchCircle.style.transform = "translateX(27px)"
      temeMode.textContent = "dark_mode"
   }else{
      temeMode.textContent = "light_mode"
      switchCircle.style.removeProperty("transform")
   }
})

const config = document.getElementById("config")
let editsCat = null
let addsWeb = null
let delsCat = null
opAndClo.forEach(ev=> {
   ev.addEventListener("click", ()=>{
      categories.classList.toggle("open_categorie")
      if(ev == openCategories){
         editsCat = document.querySelectorAll("#edit_cat")
         addsWeb = document.querySelectorAll("#add_web")
         delsCat = document.querySelectorAll("#del_cat")
      }
   })
})

addCategorie.addEventListener("click", ()=> {
   let optiones = `<p class="config_title">Agregar categoría</p>
   <label class="config_input" for="name">Nombre</label>
   <input type="text" id="name" name="name" placeholder="Nombre de la categoría" required>

   <label class="config_input" for="description">Descripción</label>
   <input type="text" id="description" name="description" placeholder="Descripción" required>
   
   <label class="config_input" for="color">Color</label>
   <input class="color_input" type="color" id="color" name="color">`
   
   insertFrom(config, optiones)
   config.style.transform = "scale(1)"
   const form = document.getElementById("create_category")
   const configClose = document.getElementById("config_close")
   const btnCancelC = document.getElementById("btn_cancel_c")
   form.addEventListener("submit", (event)=>{
      event.preventDefault()
   
      let name = event.target.name.value
      let description = event.target.description.value
      let color = event.target.color.value
      createCategorie(name, description, color)
      insertCatHtml(listCategories)
      config.style.transform = "scale(0)"
      editsCat = document.querySelectorAll("#edit_cat")
      addsWeb = document.querySelectorAll("#add_web")
      delsCat = document.querySelectorAll("#del_cat")
   })
   config.addEventListener("click", (evc)=>{
      if(evc.target == config || evc.target == configClose || evc.target == btnCancelC){
         config.style.transform = "scale(0)"
      }
   })
})


listCategories.addEventListener("click", (event) => {
   editsCat.forEach(doc=> {
      if(event.target == doc){
         let id = doc.parentElement.dataset.id, categoria = getCategorie(id)
         let optiones = `<p class="config_title">Editar categoría</p>
         <label class="config_input" for="name">Nombre</label>
         <input type="text" id="name" name="name" placeholder="Nombre de la categoría" value="${categoria.name}" required>
   
         <label class="config_input" for="description">Descripción</label>
         <input type="text" id="description" name="description" placeholder="Descripción" value="${categoria.description}" required>
         
         <label class="config_input" for="position">Posicion</label>
         <input type="number" min="1" max="20" id="position" name="position"  value="${categoria.position}" required>
   
         <label class="config_input" for="color">Color</label>
         <input class="color_input" type="color" id="color" name="color" value="${categoria.color}"  required>`
         
         insertFrom(config, optiones)
         config.style.transform = "scale(1)"
         const form = document.getElementById("create_category")
         const configClose = document.getElementById("config_close")
         const btnCancelC = document.getElementById("btn_cancel_c")
         form.addEventListener("submit", (event)=>{
            event.preventDefault()
         
            let name = event.target.name.value
            let description = event.target.description.value
            let color = event.target.color.value
            let pos = event.target.position.value
            updateCategorie(id, name, description, Number(pos), color)
            insertCatHtml(listCategories)
            config.style.transform = "scale(0)"
            editsCat = document.querySelectorAll("#edit_cat")
            addsWeb = document.querySelectorAll("#add_web")
            delsCat = document.querySelectorAll("#del_cat")
         })
         config.addEventListener("click", (evc)=> {if(evc.target == config || evc.target == configClose || evc.target == btnCancelC) config.style.transform = "scale(0)"})
      }
   })

   addsWeb.forEach(doc=> {
      if(event.target == doc){
         let id = doc.parentElement.dataset.id
         let optiones = `<p class="config_title">Agregar web</p>
         <label class="config_input" for="name">Nombre</label>
         <input type="text" id="name" minlength="2" maxlength="12" name="name" placeholder="Nombre de la web" required>
   
         <label class="config_input" for="description">Descripción</label>
         <input type="text" id="description" name="description" placeholder="Descripción">
         
         <label class="config_input" for="url">Url</label>
         <input type="text" id="url" name="url" placeholder="Url de la web" required>`
         
         insertFrom(config, optiones)
         config.style.transform = "scale(1)"
         const form = document.getElementById("create_category")
         const configClose = document.getElementById("config_close")
         const btnCancelC = document.getElementById("btn_cancel_c")
         form.addEventListener("submit", (event)=>{
            event.preventDefault()
         
            let name = event.target.name.value
            let description = event.target.description.value || name
            let url = event.target.url.value
            addWeb(id, name, description, url)
            insertWebs(container)
            insertCatHtml(listCategories)
            config.style.transform = "scale(0)"
            editsCat = document.querySelectorAll("#edit_cat")
            addsWeb = document.querySelectorAll("#add_web")
            delsCat = document.querySelectorAll("#del_cat")
         })
         config.addEventListener("click", (evc)=> {if(evc.target == config || evc.target == configClose || evc.target == btnCancelC) config.style.transform = "scale(0)"})
      }
   })

   delsCat.forEach((doc, ps)=> {
      if(event.target == doc){
         let id = doc.parentElement.dataset.id
         deleteCategorie(id)
         insertCatHtml(listCategories)
         editsCat = document.querySelectorAll("#edit_cat")
         addsWeb = document.querySelectorAll("#add_web")
         delsCat = document.querySelectorAll("#del_cat")
      }
   })
})


container.addEventListener("click", (event)=>{
   if(categories.classList.contains("open_categorie")){
      categories.classList.remove("open_categorie")
   }

   const btnsWeb = document.querySelectorAll(".btn_web")
   const btnIcons = document.querySelectorAll(".btn_icon")
   const settings = document.querySelectorAll(".settings")

   const editsWeb = document.querySelectorAll("#edit_web")
   const deletesWeb = document.querySelectorAll("#delete_web")

   btnsWeb.forEach(btn=> btn.classList.remove("btn_active"))
   settings.forEach(sts=> sts.classList.remove("active_settings"))
   btnsWeb.forEach((btn, bps)=> {
      if(btn == event.target || btnIcons[bps] == event.target){
         btn.classList.add("btn_active")
         settings[bps].classList.add("active_settings")
      }
   })

   editsWeb.forEach(doc=> {
      if(event.target == doc){
         let catId = doc.parentElement.parentElement.dataset.catid, categoria = getCategorie(catId), webId = doc.parentElement.parentElement.dataset.id, web = getWeb(catId, webId)
         let optiones = `<p class="config_title">Editar web</p>
         <label class="config_input" for="name">Nombre</label>
         <input type="text" id="name" name="name" placeholder="Nombre de la web" value="${web.name}" required>
   
         <label class="config_input" for="description">Descripción</label>
         <input type="text" id="description" name="description" placeholder="Descripción" value="${web.description}" required>
         
         <label class="config_input" for="url">Url</label>
         <input type="text" id="url" name="url" placeholder="Url de la web" value="${web.url}" required>

         <label class="config_input" for="position">Posición</label>
         <input type="number" min="1" max="${categoria.webs.length}" id="position" name="position" placeholder="Posición de la web" value="${web.position}" required>`
         // `<input type="number" min="1" max="20" id="position" name="position" placeholder="Posición" value="2" required>`
         
         insertFrom(config, optiones)
         config.style.transform = "scale(1)"
         const form = document.getElementById("create_category")
         const configClose = document.getElementById("config_close")
         const btnCancelC = document.getElementById("btn_cancel_c")
         form.addEventListener("submit", (event)=>{
            event.preventDefault()
         
            let name = event.target.name.value
            let description = event.target.description.value
            let url = event.target.url.value
            let pos = event.target.position.value
            editWeb(catId, webId, name, description, url, Number(pos))
            insertWebs(container)
            config.style.transform = "scale(0)"
         })
         config.addEventListener("click", (evc)=> {if(evc.target == config || evc.target == configClose || evc.target == btnCancelC) config.style.transform = "scale(0)"})
      }
   })

   deletesWeb.forEach((doc, ps)=> {
      if(event.target == doc){
         let catId = doc.parentElement.parentElement.dataset.catid, webId = doc.parentElement.parentElement.dataset.id
         deleteWeb(catId, webId)
         insertWebs(container)
         insertCatHtml(listCategories)
      }
   })
})

mixitup(".container", {
   selectors: {
      target: '.web_page'
   },
   animation: {
      duration: 300
   }
}).filter("all")