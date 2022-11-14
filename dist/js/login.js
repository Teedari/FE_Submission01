import Api from "./models/Api.js";
import { element } from "./helpers.js";
import PersistentData from "./models/PersistentData.js";

const form = element("#login-form");
const formSubmitHandler = function (e) {
  e.preventDefault();
  e.submitter.setAttribute('disabled', null)
  const data = {
    username: this["username"].value,
    password: this['password'].value,
  };

  const api = new Api(axios);

  api
    .post("/login", data)
    .then((response) => {
      location.href = ''
      PersistentData.activateUser(response.data);
    })
    .catch((error) => {
      console.warn(error);
      e.submitter.removeAttribute('disabled')
    });
}

form.onsubmit = formSubmitHandler;
