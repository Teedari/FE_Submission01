const render = (component, events = () => {}) => {
  const app = document.getElementById("app");
  app.innerHTML = component;
  events();
};

const element = (domString) => {
  const el = document.querySelectorAll(domString);
  const exist = el.length > 0;

  if (exist && el.length === 1) {
    return el[0];
  } else if (exist && el.length > 1) {
    return el;
  }
  return {};
};


const refreshTokenExpireTime = (seconds=10) => {
  const date = new Date()
  const expireSeconds = seconds * 60 * 1000
  return date.getTime() + expireSeconds
}

const refreshTokenHasExpire = (tokenTime) => {
  const date =  new Date()
  return date.getTime() >= tokenTime
}

export { render, element, refreshTokenExpireTime, refreshTokenHasExpire };
