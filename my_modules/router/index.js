import anchorTagNavigator from "./controller/anchorTagNavigator";
import routerInitialLoad from "./controller/routerInitialLoad";
import routesConverter from "./helpers/routesConverter";


const routerInstance = (routes, userRouterGuardFunction) => {
   document.addEventListener("DOMContentLoaded", () => {

      const readyToUseRoutes = routesConverter(routes)

      routerInitialLoad(readyToUseRoutes, userRouterGuardFunction)

      document.body.addEventListener("click", element => {
         if (element.target.matches("[router-link]")) {
            anchorTagNavigator(element, readyToUseRoutes, userRouterGuardFunction)
         }
      })
   });
}

export default routerInstance
