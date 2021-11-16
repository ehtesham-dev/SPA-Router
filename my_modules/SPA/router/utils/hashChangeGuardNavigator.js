import originRouteObjectGenerator from "./originRouteObjectGenerator";
import destinationRouteObjectGenerator from "./destinationRouteObjectGenerator";
import routerGuardDestinationPath from "./routerGuardDestinationPath";

const hashChangeGuardNavigator = (routerParts ,previousPath) =>{
   const destAndOriginRoutesObject = {
      fromPath: originRouteObjectGenerator(routerParts.routes, previousPath),
      toPath: destinationRouteObjectGenerator(routerParts.routes)
   }

   const routesAndGuard = {
      destAndOrigin: destAndOriginRoutesObject,
      guardFunction: routerParts.userRouterGuardFunction
   }

   const guardDestination = routerGuardDestinationPath(routesAndGuard)

   this.simpleNavigator(guardDestination)

   return routesAndGuard
}

export default hashChangeGuardNavigator
