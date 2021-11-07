import NotFound from "../../core/pages/NotFoundPage";
import pathRegex from "./pathRegex";
import pathGenerator from "./currentPathGenerator";

const destinationRouteGenerator = (element, routes) => {
   const clearDestinationPath = !element ? pathGenerator() : element.target.attributes.to.nodeValue.split('?')[0]
   const findDestPath = routes.find(route => clearDestinationPath.match(pathRegex(route.path)))

   return !findDestPath ?  {path: '/not-found', name: 'NotFound', component: NotFound, meta: {}} : findDestPath
}

const originRouteGenerator = (routes) => {
   const findDestPath = routes.find(route => pathGenerator().match(pathRegex(route.path)))

   return !findDestPath ?  {path: '/not-found', name: 'NotFound', component: NotFound, meta: {}} : findDestPath
}


const routerGuardRouteObjectProvider = (element, routes) => {
   const finalObject = {}

   finalObject.toPath = destinationRouteGenerator(element, routes)

   finalObject.fromPath = originRouteGenerator(routes)

   return finalObject
}

export default routerGuardRouteObjectProvider
