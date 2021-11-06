import routesObjectPreparer from "../router/routesObjectPreparer";
import findMatchRoute from "../router/findMatchRoute";

export default class RouteContentLoader{
   constructor(routes) {
      this.routes = routes
   }

   async routeContentLoad() {
      const routesObject = routesObjectPreparer(this.routes)

      const currentRouteObject = findMatchRoute(routesObject)

      const routerData = {
         name: currentRouteObject.route.name,
         parameter: this.getParams(currentRouteObject),
         queryString: this.queryStringObjectGenerator(),
      }

      const constructorPayload = await this.childrenRouterView(currentRouteObject.route, routerData)

      const PageComponent = new currentRouteObject.route.component(constructorPayload);

      document.querySelector("#app").innerHTML = await PageComponent.htmlTemplate();

      if(document.getElementsByTagName('router-view') && constructorPayload.routerView)
         document.querySelector('router-view').innerHTML = constructorPayload.routerView
   }

   getParams(currentRoute) {

      const values = currentRoute.paramArray.slice(1);

      const keys = Array.from(currentRoute.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);

      return Object.fromEntries(keys.map((key, i) => {
         return [key, values[i]];
      }));
   };

   queryStringObjectGenerator() {

      const fixAndDecode = string => {
         return decodeURIComponent(string.replace(/\+/g, " "));
      }

      const queryRegex = /([^&=]+)=?([^&]*)/g

      let query = window.location.search.substring(1);

      if(window.location.hash){
         query = window.location.hash.replace('#','').split('?')[1]
      }

      let urlParams = {};

      let match
      while (match = queryRegex.exec(query))
         urlParams[fixAndDecode(match[1])] = fixAndDecode(match[2]);

      return urlParams
   }

   async childrenRouterView( currentRouteObject, constructorPayload) {

      let classConstructorData = constructorPayload

      if("childComponent" in currentRouteObject) {
         const childViewComponent = new currentRouteObject.childComponent(constructorPayload)
         classConstructorData.routerView = await childViewComponent.htmlTemplate()
      }

      return classConstructorData
   }
}
