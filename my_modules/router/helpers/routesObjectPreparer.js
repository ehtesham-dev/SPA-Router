import pathRegex from "./pathRegex";

const routesObjectPreparer = ( routes ) => {

   return routes.map(route => {
      return {
         route,
         paramArray: location.pathname.match(pathRegex(route.path)),
      }
   })
};

export default routesObjectPreparer
