import HistoryFactory from "../history/factory";
import CoreContentLoader from "../core/CoreContentLoader";
import mainRouteObjectPreparer from "./utils/mainRouteObjectPreparer";
import routerGuardDestinationPath from "./utils/routerGuardDestinationPath";
import pathGenerator from "./utils/currentPathGenerator";
import originRouteObjectGenerator from "./utils/originRouteObjectGenerator";
import destinationRouteObjectGenerator from "./utils/destinationRouteObjectGenerator";


export default class Router {
   constructor(routes, userRouterGuardFunction, mode) {
      this.routerParts = {
         routes: mainRouteObjectPreparer(routes),
         userRouterGuardFunction,
         modeInstance: new HistoryFactory(mode)
      }
      this.coreObject = new CoreContentLoader(this.routerParts.routes)
      if (this.routerParts.modeInstance.modeName === 'hashMode')
         this.hashChangeByLink = false
   }

   async routeContentLoader(destAndOrigin) {
      return this.coreObject.routeContentLoad(destAndOrigin);
   }

   triggerEventListeners() {
      if (this.routerParts.modeInstance.modeName === 'hashMode') {
         window.addEventListener('hashchange', async () => {
            if(!this.hashChangeByLink) {
               const hashHistory = this.routerParts.modeInstance.hashHistoryArray
               if(hashHistory.length){
                  const previousPath = hashHistory.pop()
                  await this.eventContentLoad(previousPath)
               }
               else await this.routerInitialLoad()
            }
            this.hashChangeByLink = false
         }, false);
      }
      else {
         window.addEventListener("popstate", async () => {
            const previousPath = this.routerParts.modeInstance.popHistoryArray()
            await this.eventContentLoad(previousPath)
         });
      }

      document.body.addEventListener("click", async (element) => {
         if (element.target.localName === "router-link")
            await this.anchorTagNavigator(element)
      })
   }

   async eventContentLoad(previousPath) {
      const destAndOriginRoutesObject = {
         fromPath: originRouteObjectGenerator(this.routerParts.routes, previousPath),
         toPath: destinationRouteObjectGenerator(this.routerParts.routes)
      }

      const routesAndGuard = {
         destAndOrigin: destAndOriginRoutesObject,
         guardFunction: this.routerParts.userRouterGuardFunction
      }

      const guardDestination = routerGuardDestinationPath(routesAndGuard)

      this.simpleNavigator(guardDestination)

      await this.routeContentLoader(routesAndGuard.destAndOrigin)
   }


   simpleNavigator(destinationPath) {
      this.routerParts.modeInstance.navigateTo(destinationPath)
   }

   async anchorTagNavigator(element) {
      element.preventDefault();

      if(this.routerParts.modeInstance.modeName === 'hashMode')
         this.hashChangeByLink = true

      const destAndOriginRoutesObject = {
         fromPath: originRouteObjectGenerator(this.routerParts.routes),
         toPath: destinationRouteObjectGenerator(this.routerParts.routes, element)
      }

      const routesAndGuard = {
         destAndOrigin: destAndOriginRoutesObject,
         guardFunction: this.routerParts.userRouterGuardFunction
      }

      const destinationPath = routerGuardDestinationPath(routesAndGuard, element)

      this.simpleNavigator(destinationPath)

      await this.routeContentLoader(routesAndGuard.destAndOrigin)
   }

   async routerInitialLoad() {
      const destAndOriginRoutesObject = {
         fromPath: 'Initial Load!',
         toPath: destinationRouteObjectGenerator(this.routerParts.routes)
      }

      const routesAndGuard = {
         destAndOrigin: destAndOriginRoutesObject,
         guardFunction: this.routerParts.userRouterGuardFunction
      }
      const guardDestination = routerGuardDestinationPath(routesAndGuard)

      if (guardDestination === pathGenerator())
         await this.routeContentLoader(routesAndGuard.destAndOrigin)
      else {
         this.simpleNavigator(guardDestination)
         await this.routeContentLoader(routesAndGuard.destAndOrigin)
      }
   }
}
