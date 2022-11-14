import { render } from "../helpers.js"

export default class {
  TEMPLATE_DIR = '../../pages/'
  constructor(template_path, title='', scripts=[]){
    document.title = 'Freddys | '.concat(title)
    this.template_path = this.TEMPLATE_DIR.concat(template_path)
    this.scripts = scripts
  }


  _checkTempateFileExistence = () => {
    console.log(window.open(this.template_path))
  }
  
  
  _render = (component) => {
    const app = document.getElementById("app");
    app.innerHTML = component;
  }

  _renderScripts = () => {
    this.scripts
    .forEach( scriptUrl => {
      const scriptElement = document.createElement('script')
      scriptElement.src = scriptUrl
      scriptElement.setAttribute('type', 'module')
      scriptElement.setAttribute('defer', 'true')
      document.querySelector('head').append(scriptElement)
    })
  }
  
  as_view = async () => {
    if(!this.template_path){
      return '<div> Page NOT FOUND </div>'
    }
    const response = await fetch(this.template_path)
    const component = await response.text()
    
    this._render(component)
    this._renderScripts()
  }




}