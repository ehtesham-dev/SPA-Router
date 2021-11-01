import routeContentLoader from "./routeContentLoader";
import routesObjectPreparer from "./routesObjectPreparer";

const anchorTagNavigator = (element, routes) => {
   element.preventDefault();

   history.pushState(null, null, element.target.href)

   const routesObject = routesObjectPreparer(routes)
   routeContentLoader(routesObject)
}

export default anchorTagNavigator
