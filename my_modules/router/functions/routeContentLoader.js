import getParams from "./retriveRouteParams";
import findMatchRoute from "./findMatchRoute";
import queryStringObjectGenerator from "./queryStringObjectGenerator";
import routesObjectPreparer from "./routesObjectPreparer";


const routeContentLoader = async ( routes ) => {

   const routesObject = routesObjectPreparer(routes)

   const currentRoute = findMatchRoute(routesObject)

   const routerData = {
      parameter: getParams(currentRoute),
      queryString: queryStringObjectGenerator()
   }

   const PageComponent = new currentRoute.route.component(routerData);

   document.querySelector("#app").innerHTML = await PageComponent.getHtml();
}

export default routeContentLoader
