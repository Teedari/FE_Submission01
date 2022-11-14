import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(){
    super(
      '../../../pages/dashboard.html', 
      'Dashboard',
      [
        './dist/js/dashboard.js',
        './dist/js/common.js'
      ]
      )
  }
}