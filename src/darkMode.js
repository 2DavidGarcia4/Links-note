import LinksNote from "./categories.js";

function setMode(document){
   if(LinksNote.darkMode){
      document.classList.add("dark_teme")
   }
}

function switchMode(bolen){
   LinksNote.darkMode = bolen
   localStorage.setItem("LinksNote", JSON.stringify(LinksNote))
}

export { setMode, switchMode}