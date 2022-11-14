import { refreshTokenExpireTime } from "../helpers.js";

export default class PersistentData {
  static _PREFIX = "freddys__";

  static _generateKey = (key) => PersistentData._PREFIX.concat(key);
  static _setData = (key, value) => {
    localStorage.setItem(
      PersistentData._generateKey(key),
      JSON.stringify(value)
    );
  };

  static _getData = (key) => {
    try {
      const value = localStorage.getItem(PersistentData._generateKey(key));
      if (value) {
        return JSON.parse(value);
      }
    } catch (Exception) {
      return null;
    }
  };

  static activateUser = (value, key = "user") => {
    PersistentData._setData(key, {
      ...value,
      expire_time: refreshTokenExpireTime(15),
    });
  };

  static deactivateUser = (key = "user") => {
    localStorage.removeItem(PersistentData._generateKey(key));
  };

  static getUser = (axios = null, key = "user") => {
    let token = PersistentData._getData(key);

    if (axios) {
      axios
        .token(token["refresh_token"])
        .post("/refresh")
        .then((response) => {
          token = PersistentData._setRefreshToken(
            response.data["access_token"]
          );
        })
        .catch((error) => {});
    }
    return token;
  };

  static _setRefreshToken = (accessToken) => {
    console.warn(accessToken);
    let token = {
      ...PersistentData._getData("user"),
      access_token: accessToken,
      expire_time: refreshTokenExpireTime(15),
    };
    console.log(token, "TOKENia");
    PersistentData.activateUser(token);
    return token;
  };
}
