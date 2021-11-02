import routeContentLoader from "./routeContentLoader";
import routerGuardDestinationPath from "./routerGuardDestinationPath";

const anchorTagNavigator = (element, routes, userRouterGuardFunction) => {
   element.preventDefault();

   const destinationPath = routerGuardDestinationPath( routes, userRouterGuardFunction, element)

   console.log('path',destinationPath)

   history.pushState(null, null, destinationPath)

   routeContentLoader(routes)
}

export default anchorTagNavigator

