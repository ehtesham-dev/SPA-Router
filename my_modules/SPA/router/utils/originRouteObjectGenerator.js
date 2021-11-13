import pathGenerator from "./currentPathGenerator";
import pathRegex from "./pathRegex";
import NotFound from "../../core/pages/NotFoundPage";

const originRouteObjectGenerator = (routes, popstatePreviousPath) => {
   const path = popstatePreviousPath || pathGenerator()

   const findDestPath = routes.find(route => path.match(pathRegex(route.path)))

   return !findDestPath ?  {path: '/not-found', name: 'NotFound', component: NotFound, meta: {}} : findDestPath
}

export default originRouteObjectGenerator
