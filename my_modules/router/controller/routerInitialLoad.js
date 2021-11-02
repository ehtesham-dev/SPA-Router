import routerGuardDestinationPath from "./routerGuardDestinationPath";
import routeContentLoader from "./routeContentLoader";


const routerInitialLoad = (routes, userRouterGuardFunction) => {
   const guardDestination = routerGuardDestinationPath( routes, userRouterGuardFunction)
   window.addEventListener("popstate", () => {routeContentLoader(routes)});


   if(guardDestination === location.origin)
      routeContentLoader(routes)
   else {
      history.pushState(null, null, guardDestination)
      routeContentLoader(routes)
   }
}

export default routerInitialLoad
