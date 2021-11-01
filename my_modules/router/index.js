import anchorTagNavigator from "./functions/anchorTagNavigator";
import routeContentLoader from "./functions/routeContentLoader";
import routerGuardRouteProvider from './functions/routerGuardRouteProvider'

const routerInstance = (routes, routerGuard) => {
   document.addEventListener("DOMContentLoaded", () => {

      routeContentLoader(routes)

      document.body.addEventListener("click", element => {
         if (element.target.matches("[router-link]")) {
            const guardRoutesObject = routerGuardRouteProvider(element, routes)
            const destination = routerGuard(guardRoutesObject.toPath, guardRoutesObject.fromPath)

            anchorTagNavigator(element, routes, destination)
         }
      })
   });
}

export default routerInstance
