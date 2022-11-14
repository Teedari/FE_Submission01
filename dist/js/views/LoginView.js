import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor() {
    super("login.html", "Login", [
      './dist/js/login.js'
    ]);
  }
}
