import pathGenerator from "./currentPathGenerator";
import pathRegex from "./pathRegex";
import NotFound from "../../core/pages/NotFoundPage";

const destinationRouteObjectGenerator = (routes, element) => {
   const clearDestinationPath = !element ? pathGenerator() : element.target.attributes.to.nodeValue.split('?')[0]
   const findDestPath = routes.find(route => clearDestinationPath.match(pathRegex(route.path)))

   return !findDestPath ?  {path: '/not-found', name: 'NotFound', component: NotFound, meta: {}} : findDestPath
}

export default destinationRouteObjectGenerator
