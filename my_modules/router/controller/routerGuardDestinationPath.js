import routerGuardRouteProvider from "../helpers/routerGuardRouteProvider";

const routerGuardDestinationPath = ( routes, userRouterGuardFunction, element) => {
   const guardRoutesObject = routerGuardRouteProvider(element, routes)

   const guardPath = userRouterGuardFunction(guardRoutesObject.toPath, guardRoutesObject.fromPath)

   return guardPath.length ? location.origin + guardPath : (element ? element.target.href : location.origin)
}

export default routerGuardDestinationPath
