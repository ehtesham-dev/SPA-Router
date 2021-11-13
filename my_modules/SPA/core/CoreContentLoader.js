import viewComponentPayloadPreparer from "./utils/viewComponentPayloadPreparer";
import findMatchRoute from "./utils/findMatchRoute";

export default class CoreContentLoader {
   constructor(routes) {
      this.routes = routes
   }

   async routeContentLoad(destAndOriginObject) {
      const routesObject = viewComponentPayloadPreparer(this.routes)

      const currentRouteObject = findMatchRoute(routesObject)

      await this.componentRendering(currentRouteObject, destAndOriginObject)
   }

   async componentRendering(currentRouteObject, destAndOriginObject) {
      const renderComponentAndPreventReRendering = async () => {
         console.log('destAndOriginObject',destAndOriginObject)

         const hasChildComponents = !currentRouteObject.route.component
         if (hasChildComponents) {
            constructorPayload = await this.childrenRouterView(currentRouteObject.route.childComponents, constructorPayload)
            constructorPayload.routerView = constructorPayload.routerView.children[0].outerHTML

            const fromComponent = destAndOriginObject.fromPath.parentComponent || destAndOriginObject.fromPath.component
            if (destAndOriginObject.toPath.parentComponent !== fromComponent) {
               const PageComponent = new currentRouteObject.route.parentComponent(constructorPayload);
               document.querySelector("#app").innerHTML = await PageComponent.htmlTemplate();
            }

         }
         else {
            constructorPayload.routerView = ''
            const fromComponent = destAndOriginObject.fromPath.parentComponent || destAndOriginObject.fromPath.component
            if (destAndOriginObject.toPath.component !== fromComponent) {
               const PageComponent = new currentRouteObject.route.component(constructorPayload);
               document.querySelector("#app").innerHTML = await PageComponent.htmlTemplate();
            }
         }
      }

      let constructorPayload = {
         name: currentRouteObject.route.name,
         parameter: this.getParams(currentRouteObject),
         queryString: this.queryStringObjectGenerator(),
      }

      await renderComponentAndPreventReRendering()

      const routerViewElement = document.querySelector('router-view')
      if (routerViewElement) {
         routerViewElement.innerHTML = ''
         if(constructorPayload.routerView)
            routerViewElement.innerHTML = constructorPayload.routerView
      }
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

      if (window.location.hash) {
         query = window.location.hash.replace('#', '').split('?')[1]
      }

      let urlParams = {};

      let match
      while (match = queryRegex.exec(query))
         urlParams[fixAndDecode(match[1])] = fixAndDecode(match[2]);

      return urlParams
   }


   async childrenRouterView(childrenObjectArray, constructorPayload) {
      const stringHtmlToHtmlElement = (string) => {
         const template = document.createElement('template');
         template.innerHTML = string;
         return template.content
      }

      const childrenObjectArrayModel = [...childrenObjectArray]
      let constructorPayloadModel = Object.assign({}, constructorPayload)

      const outerComponentClass = childrenObjectArrayModel.pop()
      const childComponentInstance = new outerComponentClass(constructorPayloadModel)
      constructorPayloadModel.routerView = stringHtmlToHtmlElement(await childComponentInstance.htmlTemplate())

      const routerViewElement = constructorPayloadModel.routerView.querySelector('router-view')
      if (routerViewElement && childrenObjectArrayModel.length) {
         const recursiveConstructorPayload = await this.childrenRouterView(childrenObjectArrayModel, constructorPayloadModel)
         routerViewElement.innerHTML = recursiveConstructorPayload.routerView.children[0].outerHTML
      }
      return constructorPayloadModel
   }
}
