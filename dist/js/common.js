import { routing } from "./globals.js";
import { element } from "./helpers.js";


const dataLinkNavigateHandler = function(e){
  e.preventDefault()
  location.href = this.href
  routing()
}

element('[data-link]').forEach( el => {
  el.onclick = dataLinkNavigateHandler
})