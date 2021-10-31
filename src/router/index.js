import anchorTagNavigator from "./functions/anchorTagNavigator";
import routeContentLoader from "./functions/routeContentLoader";
import routesObjectPreparer from "./functions/routesObjectPreparer";

const routerInstance = () => {
   document.addEventListener("DOMContentLoaded", () => {
      const routesObject = routesObjectPreparer()

      routeContentLoader(routesObject)

      document.body.addEventListener("click", element => {
         if (element.target.matches("[router-link]")) {
            anchorTagNavigator(element)
         }
      })
   });
}

export default routerInstance
