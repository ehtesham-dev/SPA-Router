import routes from "../routes";

const pathToRegex = (path) => {
   return new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");
}

const routesObjectPreparer = () => {
   return routes.map(route => {
      return {
         route,
         paramArray: location.pathname.match(pathToRegex(route.path))
      }
   })
};

export default routesObjectPreparer
