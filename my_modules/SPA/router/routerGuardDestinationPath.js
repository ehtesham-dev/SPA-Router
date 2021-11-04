import routerGuardRouteProvider from "./routerGuardRouteProvider";
import pathGenerator from "./currentPAthGenerator";

const routerGuardDestinationPath = ( routes, userRouterGuardFunction, element) => {
   const guardRoutesObject = routerGuardRouteProvider(element, routes)

   const guardPath = userRouterGuardFunction(guardRoutesObject.toPath, guardRoutesObject.fromPath)
   console.log('destinationPath', guardPath)

   const noRestriction = (element ? element.target.attributes.to.nodeValue : pathGenerator())

   return guardPath.length ? guardPath : noRestriction
}

export default routerGuardDestinationPath
