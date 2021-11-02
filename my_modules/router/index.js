import anchorTagNavigator from "./functions/anchorTagNavigator";
import routeInitialLoader from "./functions/routeInitialLoader";
import routesInitializer from "./helpers/routesInitializer";


const routerInstance = (routes, userRouterGuardFunction) => {
   document.addEventListener("DOMContentLoaded", () => {

      const readyToUseRoutes = routesInitializer(routes)
      console.log(readyToUseRoutes)
      routeInitialLoader(readyToUseRoutes, userRouterGuardFunction)

      document.body.addEventListener("click", element => {
         if (element.target.matches("[router-link]")) {
            anchorTagNavigator(element, readyToUseRoutes, userRouterGuardFunction)
         }
      })
   });
}

export default routerInstance
