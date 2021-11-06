import routerGuardRouteProvider from "./routerGuardRouteProvider";
import pathGenerator from "./currentPathGenerator";

const routerGuardDestinationPath = ( routes, userRouterGuardFunction, element) => {
   const guardRoutesObject = routerGuardRouteProvider(element, routes)

   const guardPath = userRouterGuardFunction(guardRoutesObject.toPath, guardRoutesObject.fromPath)

   const noRestriction = (element ? element.target.attributes.to.nodeValue : pathGenerator())

   return guardPath.length ? guardPath : noRestriction
}

export default routerGuardDestinationPath
