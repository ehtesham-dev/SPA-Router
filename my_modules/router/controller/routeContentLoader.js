import getParams from "../helpers/retriveRouteParams";
import findMatchRoute from "../helpers/findMatchRoute";
import queryStringObjectGenerator from "../helpers/queryStringObjectGenerator";
import routesObjectPreparer from "../helpers/routesObjectPreparer";
import childrenRouterView from "./childrenRouterView";


const routeContentLoader = async ( routes ) => {
   const routesObject = routesObjectPreparer(routes)

   const currentRouteObject = findMatchRoute(routesObject)

   const routerData = {
      name: currentRouteObject.route.name,
      parameter: getParams(currentRouteObject),
      queryString: queryStringObjectGenerator(),
   }

   const constructorPayload = await childrenRouterView(currentRouteObject.route, routerData)

   const PageComponent = new currentRouteObject.route.component(constructorPayload);

   document.querySelector("#app").innerHTML = await PageComponent.htmlTemplate();

   document.querySelector('router-view').innerHTML = constructorPayload.routerView
}

export default routeContentLoader
