import routerGuardDestinationPath from "./routerGuardDestinationPath";
import routeContentLoader from "./routeContentLoader";


const routeInitialLoader = (routes, userRouterGuardFunction) => {
   const guardDestination = routerGuardDestinationPath( routes, userRouterGuardFunction)

   if(guardDestination === location.origin)
      routeContentLoader(routes)
   else {
      history.pushState(null, null, guardDestination)
      routeContentLoader(routes)
   }
}

export default routeInitialLoader
