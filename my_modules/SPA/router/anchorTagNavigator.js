import routeContentLoader from "../core/functions/routeContentLoader";
import routerGuardDestinationPath from "./routerGuardDestinationPath";

const anchorTagNavigator = (element, routes, userRouterGuardFunction, modeInstance) => {
   element.preventDefault();

   const destinationPath = routerGuardDestinationPath( routes, userRouterGuardFunction, element)

   modeInstance.navigateTo(destinationPath)

   routeContentLoader(routes)
}

export default anchorTagNavigator

