import Api from "./models/Api.js";
import { element } from "./helpers.js";
import PersistentData from "./models/PersistentData.js";

const form = element("#login-form");
form.onsubmit = function (e) {
  e.preventDefault();
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
    });
};
