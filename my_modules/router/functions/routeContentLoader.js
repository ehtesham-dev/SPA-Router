import getParams from "../helpers/retriveRouteParams";
import findMatchRoute from "../helpers/findMatchRoute";
import queryStringObjectGenerator from "../helpers/queryStringObjectGenerator";
import routesObjectPreparer from "../helpers/routesObjectPreparer";


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
