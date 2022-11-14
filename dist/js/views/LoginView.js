import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor() {
    super("../../pages/login.html", "Login", [
      './dist/js/login.js'
    ]);
  }
}
