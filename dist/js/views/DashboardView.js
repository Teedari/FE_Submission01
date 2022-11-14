import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(){
    super(
      'dashboard.html', 
      'Dashboard',
      [
        './dist/js/dashboard.js',
        './dist/js/common.js'
      ]
      )
  }
}