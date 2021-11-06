import pathRegex from "./pathRegex";
import pathGenerator from "./currentPathGenerator";

const routesObjectPreparer = ( routes ) => {

   return routes.map(route => {
      return {
         route,
         paramArray: pathGenerator().match(pathRegex(route.path)),
      }
   })
};

export default routesObjectPreparer
