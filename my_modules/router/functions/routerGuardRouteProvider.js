import pathRegex from "../utils/pathRegex";
import NotFound from "../classes/NotFoundPage";

const destinationPathGenerator = (element, routes) => {
   const clearDestinationPath = element.target.attributes.href.value.split('?')[0]
   let findDestPath = routes.find(route => clearDestinationPath.match(pathRegex(route.path)))
   if(!findDestPath) {
      findDestPath = {
         path: '/not-found',
         name: 'NotFound',
         component: NotFound,
         meta: {}
      }
   }

   return findDestPath
}


const routerGuardRouteProvider = (element, routes) => {
   const finalObject = {}

   finalObject.toPath = destinationPathGenerator(element, routes)

   finalObject.fromPath = routes.find(route => location.pathname.match(pathRegex(route.path)))

   return finalObject
}

export default routerGuardRouteProvider
