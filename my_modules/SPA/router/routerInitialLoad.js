import routerGuardDestinationPath from "./routerGuardDestinationPath";
import routeContentLoader from "../core/functions/routeContentLoader";


const routerInitialLoad = (routes, userRouterGuardFunction, modeInstance) => {
   const guardDestination = routerGuardDestinationPath( routes, userRouterGuardFunction)
   console.log('guardDestination', guardDestination)
   window.addEventListener("popstate", () => {routeContentLoader(routes)});


   if(guardDestination === location.origin)
      routeContentLoader(routes)
   else {
      modeInstance.navigateTo(guardDestination)
      routeContentLoader(routes)
   }
}

export default routerInitialLoad
