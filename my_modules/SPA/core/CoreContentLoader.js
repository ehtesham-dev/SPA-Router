import viewComponentPayloadPreparer from "./utils/viewComponentPayloadPreparer";
import findMatchRoute from "./utils/findMatchRoute";
import queryStringObjectGenerator from "./utils/queryStringObjectGenerator";
import getParams from "./utils/getRouteParams";

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
         let equalChildren = 0

         while (equalChildren < destinationLength) {
            const lastChildOfDestinationInAWhileRound = destinationChildren[(destinationLength - 1) - equalChildren]
            const lastChildOfOriginInAWhileRound = originChildren[(originLength - 1) - equalChildren]

            if (lastChildOfDestinationInAWhileRound === lastChildOfOriginInAWhileRound) {
               equalChildren++
            } else {
               const newChildComponentArray = destinationChildren.slice(0, destinationLength - equalChildren)
               if (originLength - destinationLength === 0 && newChildComponentArray.length) {
                  return {
                     newComponents: newChildComponentArray,
                     diff: originLength - (newChildComponentArray.length -1)
                  }
               } else {
                  return {
                     newComponents: newChildComponentArray,
                     diff: originLength - (destinationLength - 1)
                  }
               }
            }
         }
         const backInSameSequenceOfChildren = !!equalChildren < originLength
         if (backInSameSequenceOfChildren) {
            return {
               newComponents: [],
               diff: originLength - equalChildren
            }
         }
         // No difference between destination and origin routes
         else return {
            newComponents: [],
            diff: 0
         }
      }

      const renderComponentAndPreventReRendering = async () => {
         const isParentComponentWithChildren = !currentRouteObject.route.component
         const fromComponent = destAndOriginObject.fromPath.parentComponent || destAndOriginObject.fromPath.component

         if (isParentComponentWithChildren) {
            if (destAndOriginObject.toPath.parentComponent !== fromComponent) {
               constructorPayload = await this.renderInRouterViews(currentRouteObject.route.childComponents, constructorPayload)
               constructorPayload.routerView = constructorPayload.routerView.children[0].outerHTML

               const ParentComponent = new currentRouteObject.route.parentComponent(constructorPayload);
               document.querySelector("#app").innerHTML = await ParentComponent.htmlTemplate();

            } else {
               const childRenderingPayload = preventChildComponentReRendering(destAndOriginObject)
               constructorPayload.routerView = await this.familyChildrenRouterView(childRenderingPayload, constructorPayload) || constructorPayload.routerView
            }
         } else {
            const routerViewElement = document.querySelector('router-view')

            if (routerViewElement)
               routerViewElement.innerHTML = ''

            if (destAndOriginObject.toPath.component !== fromComponent) {
               const PageComponent = new currentRouteObject.route.component(constructorPayload);
               document.querySelector("#app").innerHTML = await PageComponent.htmlTemplate();
            }
         }
      }

      let constructorPayload = {
         name: currentRouteObject.route.name,
         parameter: getParams(currentRouteObject),
         queryString: queryStringObjectGenerator(),
      }

      await renderComponentAndPreventReRendering()

      const routerViewElements = document.querySelectorAll('router-view')

      if (routerViewElements.length && constructorPayload.routerView) {
         routerViewElements[routerViewElements.length - 1].innerHTML = constructorPayload.routerView
      }
   }

   async renderInRouterViews(childrenObjectArray, constructorPayload) {
      const stringHtmlToHtmlElement = (string) => {
         const template = document.createElement('template');
         template.innerHTML = string;
         return template.content
      }

      const secondaryChildrenObjectArray = [...childrenObjectArray]
      let secondaryConstructorPayloadObject = Object.assign({}, constructorPayload)

      const mostOuterChildComponent = secondaryChildrenObjectArray.pop()
      const childComponentInstance = new mostOuterChildComponent(secondaryConstructorPayloadObject)
      secondaryConstructorPayloadObject.routerView = stringHtmlToHtmlElement(await childComponentInstance.htmlTemplate())

      const routerViewElement = secondaryConstructorPayloadObject.routerView.querySelector('router-view')
      if (routerViewElement && secondaryChildrenObjectArray.length) {
         const recursiveConstructorPayload = await this.renderInRouterViews(secondaryChildrenObjectArray, secondaryConstructorPayloadObject)
         routerViewElement.innerHTML = recursiveConstructorPayload.routerView.children[0].outerHTML
      }
      return secondaryConstructorPayloadObject
   }

   async familyChildrenRouterView(renderingData, constructorPayload) {
      const returnRenderedRouterView = async () => {
         const renderingPayload = await this.renderInRouterViews(renderingData.newComponents, constructorPayload)
         return renderingPayload.routerView.children[0].outerHTML
      }

      const removeRedundantRouterViewsElement = () => {
         const allRouterViewTags = document.querySelectorAll('router-view')
         if (allRouterViewTags[allRouterViewTags.length - 1].innerHTML === '') {
            allRouterViewTags[allRouterViewTags.length - 1].outerHTML = ''
            allRouterViewTags[allRouterViewTags.length - 2].innerHTML = ''
         } else
            allRouterViewTags[allRouterViewTags.length - 1].innerHTML = ''
      }

      if (renderingData.diff >= 0) {
         let counter = 0
         while (counter < renderingData.diff) {
            removeRedundantRouterViewsElement()
            counter++
         }
         if (renderingData.newComponents.length) {
            return await returnRenderedRouterView()
         }
      }
      if (renderingData.diff < 0) {
         return await returnRenderedRouterView()
      }
   }
}
