import getParams from "./retriveRouteParams";
import findMatchRoute from "../../router/findMatchRoute";
import queryStringObjectGenerator from "./queryStringObjectGenerator";
import routesObjectPreparer from "../../router/routesObjectPreparer";
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

   if(document.getElementsByTagName('router-view') && constructorPayload.routerView)
      document.querySelector('router-view').innerHTML = constructorPayload.routerView
}

export default routeContentLoader