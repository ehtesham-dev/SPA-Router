import routerGuardDestinationPath from "./routerGuardDestinationPath";
import routeContentLoader from "../core/functions/routeContentLoader";
import pathGenerator from "./currentPathGenerator";

const routerInitialLoad = (routes, userRouterGuardFunction, modeInstance) => {
   const guardDestination = routerGuardDestinationPath( routes, userRouterGuardFunction)

   window.addEventListener("popstate", () => {routeContentLoader(routes)});

   if(guardDestination === pathGenerator())
      routeContentLoader(routes)
   else {
      modeInstance.navigateTo(guardDestination)
      routeContentLoader(routes)
   }
}

export default routerInitialLoad
