const routesObjectPreparer = ( routes ) => {
   const paramsRegex = (path) => {
      return new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");
   }

   return routes.map(route => {
      return {
         route,
         paramArray: location.pathname.match(paramsRegex(route.path)),
      }
   })
};

export default routesObjectPreparer
