
const routerGuardDestinationPath = ( routesAndGuardFunction, element) => {
   const guardPath = routesAndGuardFunction.guardFunction(routesAndGuardFunction.destAndOrigin.toPath, routesAndGuardFunction.destAndOrigin.fromPath)

   const noRestriction = element ? element.target.attributes.to.nodeValue : ((location.hash) ? location.hash.replace('#', '') : location.pathname)

   return guardPath || noRestriction
}

export default routerGuardDestinationPath
