import pathGenerator from "./currentPathGenerator";

const routerGuardDestinationPath = ( routesAndGuardFunction, element) => {
   const guardPath = routesAndGuardFunction.guardFunction(routesAndGuardFunction.destAndOrigin.toPath, routesAndGuardFunction.destAndOrigin.fromPath)

   const noRestriction = element ? element.target.attributes.to.nodeValue : pathGenerator()

   return guardPath || noRestriction
}

export default routerGuardDestinationPath
