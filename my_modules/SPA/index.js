import anchorTagNavigator from "./router/anchorTagNavigator";
import routerInitialLoad from "./router/routerInitialLoad";
import routesConverter from "./router/routesConverter";
import RouterLink from "./elements/router-link";
import RouterView from "./elements/router-view";
import HistoryFactory from "./history/factory";


const routerInstance = (routes, userRouterGuardFunction, mode = 'hash') => {
   customElements.define('router-link', RouterLink);
   customElements.define('router-view', RouterView);

   const modeInstance = new HistoryFactory(mode).getModeInstance()

   const readyToUseRoutes = routesConverter(routes)

   document.addEventListener("DOMContentLoaded", () => {

      routerInitialLoad(readyToUseRoutes, userRouterGuardFunction, modeInstance)

      document.body.addEventListener("click", element => {
         if (element.target.localName === "router-link") {
            anchorTagNavigator(element, readyToUseRoutes, userRouterGuardFunction, modeInstance)
         }
      })
   });
}

export default routerInstance
