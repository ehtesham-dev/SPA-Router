import routeContentLoader from "../view/functions/routeContentLoader";
import routerGuardDestinationPath from "./routerGuardDestinationPath";

const anchorTagNavigator = (element, routes, userRouterGuardFunction) => {
   element.preventDefault();

   const destinationPath = routerGuardDestinationPath( routes, userRouterGuardFunction, element)

   history.pushState(null, null, destinationPath)

   routeContentLoader(routes)
}

export default anchorTagNavigator

