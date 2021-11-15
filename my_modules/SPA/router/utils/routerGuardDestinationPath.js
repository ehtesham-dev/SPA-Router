const PrioritizationOfGuards = (routesAndGuardFunction) => {
   const innerRouteGuard = routesAndGuardFunction.destAndOrigin.toPath.guard
   return innerRouteGuard || routesAndGuardFunction.guardFunction
}

const routerGuardDestinationPath = ( routesAndGuardFunction, element) => {

   const guard = PrioritizationOfGuards(routesAndGuardFunction)

   const guardPath = guard(routesAndGuardFunction.destAndOrigin.toPath, routesAndGuardFunction.destAndOrigin.fromPath)

   const noRestriction = element ? element.target.attributes.to.nodeValue : ((location.hash) ? location.hash.replace('#', '') : location.pathname)

   return guardPath || noRestriction
}

export default routerGuardDestinationPath
