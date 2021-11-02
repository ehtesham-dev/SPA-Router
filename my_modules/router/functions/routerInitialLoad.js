import routerGuardDestinationPath from "../functions/routerGuardDestinationPath";
import routeContentLoader from "../functions/routeContentLoader";


const routerInitialLoad = (routes, userRouterGuardFunction) => {
   const guardDestination = routerGuardDestinationPath( routes, userRouterGuardFunction)
   window.addEventListener("popstate", () => {routeContentLoader(routes)});


   if(guardDestination === location.origin)
      routeContentLoader(routes)
   else {
      console.log('init path',guardDestination)
      history.pushState(null, null, guardDestination)
      routeContentLoader(routes)
   }
}

export default routerInitialLoad
