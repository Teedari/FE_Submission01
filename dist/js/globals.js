import PersistentData from "./models/PersistentData.js";
import Route from "./models/Route.js";
import DashboardOrdersView from "./views/DashboardOrdersView.js";
import DashboardView from "./views/DashboardView.js";
import LoginView from "./views/LoginView.js";
import LogoutView from "./views/LogoutView.js";

const routes = [
  new Route('login', '#login',  LoginView),
  new Route('dashboard', '',  DashboardView),
  new Route('orders', '#orders',  DashboardOrdersView),
  new Route('logout', '#logout',  LogoutView),
]


const routing = () => {
  const hashRoutePath = location.hash

  if(!PersistentData.getUser() || false){
    const defaultPage = routes.find( route => route.name === 'login')
    defaultPage.element.as_view()
    return;
  }

  const matchHashRoute = routes.find( route => route.hash_route === hashRoutePath)

  if(matchHashRoute.hash_route === ''){
    matchHashRoute.element.as_view()
  }
  else if(matchHashRoute.hash_route === '#orders'){
    matchHashRoute.element?.as_view()
  }
  else if(matchHashRoute.hash_route === '#logout'){
    matchHashRoute.element?.as_view()
  }


}




export {routes, routing}