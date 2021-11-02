import anchorTagNavigator from "./functions/anchorTagNavigator";
import routerInitialLoad from "./functions/routerInitialLoad";
import routesConverter from "./helpers/routesConverter";


const routerInstance = (routes, userRouterGuardFunction) => {
   document.addEventListener("DOMContentLoaded", () => {

      const readyToUseRoutes = routesConverter(routes)

      routerInitialLoad(readyToUseRoutes, userRouterGuardFunction)

      document.body.addEventListener("click", element => {
         console.log(1)
         if (element.target.matches("[router-link]")) {
            anchorTagNavigator(element, readyToUseRoutes, userRouterGuardFunction)
         }
      })
   });
}

export default routerInstance
