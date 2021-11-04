import pathRegex from "./pathRegex";
import NotFound from "../view/NotFoundPage";

const destinationRouteGenerator = (element, routes) => {
   const clearDestinationPath = !element ? location.pathname : element.target.attributes.to.nodeValue.split('?')[0]
   const findDestPath = routes.find(route => clearDestinationPath.match(pathRegex(route.path)))

   return !findDestPath ?  {path: '/not-found', name: 'NotFound', component: NotFound, meta: {}} : findDestPath
}

const originRouteGenerator = (routes) => {
   const findDestPath = routes.find(route => location.pathname.match(pathRegex(route.path)))

   return !findDestPath ?  {path: '/not-found', name: 'NotFound', component: NotFound, meta: {}} : findDestPath
}


const routerGuardRouteProvider = (element, routes) => {
   const finalObject = {}

   finalObject.toPath = destinationRouteGenerator(element, routes)

   finalObject.fromPath = originRouteGenerator(routes)

   return finalObject
}

export default routerGuardRouteProvider
