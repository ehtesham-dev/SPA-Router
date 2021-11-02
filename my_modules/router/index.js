import anchorTagNavigator from "./functions/anchorTagNavigator";
import routeInitialLoader from "./functions/routeInitialLoader";


const routerInstance = (routes, userRouterGuardFunction) => {
   document.addEventListener("DOMContentLoaded", () => {

      routeInitialLoader(routes, userRouterGuardFunction)

      document.body.addEventListener("click", element => {
         if (element.target.matches("[router-link]")) {
            anchorTagNavigator(element, routes, userRouterGuardFunction)
         }
      })
   });
}

export default routerInstance
