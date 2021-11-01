import getParams from "./retriveRouteParams";
import findMatchRoute from "./findMatchRoute";
import queryStringObjectGenerator from "./queryStringObjectGenerator";


const routeContentLoader = async ( routes ) => {

   const currentRoute = findMatchRoute(routes)

   const routerData = {
      parameter: getParams(currentRoute),
      queryString: queryStringObjectGenerator()
   }

   const PageComponent = new currentRoute.route.component(routerData);

   document.querySelector("#app").innerHTML = await PageComponent.getHtml();
}

export default routeContentLoader
