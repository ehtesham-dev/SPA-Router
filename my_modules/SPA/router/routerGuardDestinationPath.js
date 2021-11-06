import routerGuardRouteProvider from "./routerGuardRouteProvider";
import pathGenerator from "./currentPathGenerator";

const routerGuardDestinationPath = ( routesAndGuardFunction, element) => {
   const guardRoutesObject = routerGuardRouteProvider(element, routesAndGuardFunction.routes)

   const guardPath = routesAndGuardFunction.guardFunction(guardRoutesObject.toPath, guardRoutesObject.fromPath)

   const noRestriction = (element ? element.target.attributes.to.nodeValue : pathGenerator())

   return guardPath.length ? guardPath : noRestriction
}

export default routerGuardDestinationPath
