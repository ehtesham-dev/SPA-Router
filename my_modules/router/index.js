import anchorTagNavigator from "./functions/anchorTagNavigator";
import routeContentLoader from "./functions/routeContentLoader";
import routesObjectPreparer from "./functions/routesObjectPreparer";

const routerInstance = ( routes ) => {
   document.addEventListener("DOMContentLoaded", () => {
      const routesObject = routesObjectPreparer(routes)

      routeContentLoader(routesObject)

      document.body.addEventListener("click", element => {
         if (element.target.matches("[router-link]")) {
            anchorTagNavigator(element, routes)
         }
      })
   });
}

export default routerInstance
