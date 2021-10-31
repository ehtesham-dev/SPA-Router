import routeContentLoader from "./routeContentLoader";
import routesObjectPreparer from "./routesObjectPreparer";

const anchorTagNavigator = element => {
   element.preventDefault();

   history.pushState(null, null, element.target.href)

   const routesObject = routesObjectPreparer()
   routeContentLoader(routesObject)
}

export default anchorTagNavigator
