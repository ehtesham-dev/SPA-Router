import anchorTagNavigator from "./controller/anchorTagNavigator";
import routerInitialLoad from "./controller/routerInitialLoad";
import routesConverter from "./helpers/routesConverter";
import RouterLink from "./elements/router-link";
import RouterView from "./elements/router-view";


const routerInstance = (routes, userRouterGuardFunction) => {
   customElements.define('router-link', RouterLink);
   customElements.define('router-view', RouterView);

   document.addEventListener("DOMContentLoaded", () => {

      const readyToUseRoutes = routesConverter(routes)

      routerInitialLoad(readyToUseRoutes, userRouterGuardFunction)

      document.body.addEventListener("click", element => {
         console.log(element)
         if (element.target.localName === "router-link") {
            anchorTagNavigator(element, readyToUseRoutes, userRouterGuardFunction)
         }
      })
   });
}

export default routerInstance
