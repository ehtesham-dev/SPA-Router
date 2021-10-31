import anchorTagNavigator from "./functions/anchorTagNavigator";
import routeContentLoader from "./functions/routeContentLoader";

const routerInstance = () => {
   document.addEventListener("DOMContentLoaded", () => {
      routeContentLoader()

      document.body.addEventListener("click", element => {
         anchorTagNavigator(element)
      })
   });
}

export default routerInstance
