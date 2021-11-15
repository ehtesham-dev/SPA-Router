import viewComponentPayloadPreparer from "./utils/viewComponentPayloadPreparer";
import findMatchRoute from "./utils/findMatchRoute";
// import originRouteObjectGenerator from "../router/utils/originRouteObjectGenerator";

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
      const preventChildComponentReRendering = () => {
         const originChildren = destAndOriginObject.fromPath.childComponents || []
         const destinationChildren = destAndOriginObject.toPath.childComponents
         const destinationLength = destinationChildren.length
         const originLength = originChildren.length
         let counter = 0

         while (counter < destinationLength) {
            if (destinationChildren[(destinationLength - 1) - counter] === originChildren[(originLength - 1) - counter]) {
               counter++
            } else {
               const newChildComponentArray = destinationChildren.slice(0, destinationLength - counter)
               if (originLength - destinationLength === 0 && newChildComponentArray.length) {
                  return {
                     newComponents: newChildComponentArray,
                     diff: originLength - newChildComponentArray.length
                  }
               } else {
                  return {
                     newComponents: newChildComponentArray,
                     diff: originLength - destinationLength
                  }
               }
            }
         }
         if (counter < originLength) {
            return {
               newComponents: [],
               diff: originLength - counter
            }
         }
         else return {
            newComponents: [],
            diff: 0
         }
      }

      const renderComponentAndPreventReRendering = async () => {

         const isParentComponents = !currentRouteObject.route.component
         if (isParentComponents) {
            const fromComponent = destAndOriginObject.fromPath.parentComponent || destAndOriginObject.fromPath.component
            if (destAndOriginObject.toPath.parentComponent !== fromComponent) {
               constructorPayload = await this.renderInRouterViews(currentRouteObject.route.childComponents, constructorPayload)
               constructorPayload.routerView = constructorPayload.routerView.children[0].outerHTML
               const PageComponent = new currentRouteObject.route.parentComponent(constructorPayload);
               document.querySelector("#app").innerHTML = await PageComponent.htmlTemplate();
            } else {
               const childRenderingPayload = preventChildComponentReRendering(destAndOriginObject)
               constructorPayload.routerView = await this.familyChildrenRouterView(childRenderingPayload, constructorPayload) || constructorPayload.routerView
            }
         } else {
            const routerViewElement = document.querySelector('router-view')
            if (routerViewElement)
               routerViewElement.innerHTML = ''
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

      const routerViewElement = document.querySelectorAll('router-view')

      if (routerViewElement.length && constructorPayload.routerView) {
         routerViewElement[routerViewElement.length - 1].innerHTML = constructorPayload.routerView
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

   async renderInRouterViews(childrenObjectArray, constructorPayload) {
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
         const recursiveConstructorPayload = await this.renderInRouterViews(childrenObjectArrayModel, constructorPayloadModel)
         routerViewElement.innerHTML = recursiveConstructorPayload.routerView.children[0].outerHTML
      }
      return constructorPayloadModel
   }

   async familyChildrenRouterView(renderingData, constructorPayload) {
      const returnRenderedRouterView = async () => {
         const renderingPayload = await this.renderInRouterViews(renderingData.newComponents, constructorPayload)
         return renderingPayload.routerView.children[0].outerHTML
      }
      // console.log('renderingData', renderingData)

      if (renderingData.diff >= 0) {
         let counter = 0
         while (counter < renderingData.diff) {
            const allRouterViewTags = document.querySelectorAll('router-view')
            if (allRouterViewTags[allRouterViewTags.length - 1].innerHTML === ''){
               allRouterViewTags[allRouterViewTags.length - 1].outerHTML = ''
               allRouterViewTags[allRouterViewTags.length - 2].innerHTML = ''
            }
            else
               allRouterViewTags[allRouterViewTags.length - 1].innerHTML = ''
            counter++
         }
         if(renderingData.newComponents.length) {
            const allRouterViewTags = document.querySelectorAll('router-view')
            if (allRouterViewTags[allRouterViewTags.length - 1].innerHTML === ''){
               allRouterViewTags[allRouterViewTags.length - 1].outerHTML = ''
               allRouterViewTags[allRouterViewTags.length - 2].innerHTML = ''
            }
            return await returnRenderedRouterView()
         }
      }
      if (renderingData.diff < 0) {
         return await returnRenderedRouterView()
      }
   }
}
