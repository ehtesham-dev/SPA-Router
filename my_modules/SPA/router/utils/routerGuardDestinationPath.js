const PrioritizationOfGuards = (routesAndGuardFunction) => {
   const innerRouteGuard = routesAndGuardFunction.destAndOrigin.toPath.guard
   return innerRouteGuard || routesAndGuardFunction.guardFunction
}

const routerGuardDestinationPath = ( routesAndGuardFunction, element) => {
   let nextDestination = ''

   const nextAction = (destination) => {
      nextDestination = destination
   }

   const guard = PrioritizationOfGuards(routesAndGuardFunction)

   guard(routesAndGuardFunction.destAndOrigin.toPath, routesAndGuardFunction.destAndOrigin.fromPath, nextAction)

   const guardRedirectPath = nextDestination

   const noRestriction = element ? element.target.attributes.to.nodeValue : ((location.hash) ? location.hash.replace('#', '') : location.pathname)

   return guardRedirectPath || noRestriction
}

export default routerGuardDestinationPath
