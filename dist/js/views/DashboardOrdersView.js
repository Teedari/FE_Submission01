import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor() {
    super("dashboard_orders.html", "Dashboard | Orders", [
      "./dist/js/dashboard_orders.js",
      './dist/js/common.js'
    ]);
  }
}
