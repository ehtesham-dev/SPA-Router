import routerGuardRouteObjectProvider from "./routerGuardRouteObjectProvider";
import pathGenerator from "./currentPathGenerator";

const routerGuardDestinationPath = ( routesAndGuardFunction, element) => {
   const guardRoutesObject = routerGuardRouteObjectProvider(element, routesAndGuardFunction.routes)

   const guardPath = routesAndGuardFunction.guardFunction(guardRoutesObject.toPath, guardRoutesObject.fromPath)

   const noRestriction = element ? element.target.attributes.to.nodeValue : pathGenerator()

   return guardPath || noRestriction
}

export default routerGuardDestinationPath
