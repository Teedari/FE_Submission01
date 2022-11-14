import PersistentData from "../models/PersistentData.js";
import AbstractView from "./AbstractView.js";
import LoginView from "./LoginView.js";

export default class extends AbstractView {

  as_view = () => {
    PersistentData.deactivateUser()
    return new LoginView().as_view()
  }

}
