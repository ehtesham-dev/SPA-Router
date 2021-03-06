import HistoryFactory from "../history/historyModeFactory";
import CoreContentLoader from "../core/CoreContentLoader";
import mainRouteObjectPreparer from "./utils/mainRouteObjectPreparer";
import routerGuardDestinationPath from "./utils/routerGuardDestinationPath";
import pathGenerator from "./utils/currentPathOrHashGenerator";
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
               const hashHistoryArray = this.routerParts.modeInstance.hashHistoryArray
               if(hashHistoryArray.length) {
                  const previousPath = this.routerParts.modeInstance.popHashHistoryArray()
                  await this.hashChangeGuardNavigator(this.routerParts, previousPath)
               }
               else {
                  await this.routerInitialLoad()
               }
            }
            this.hashChangeByLink = false
         }, false);
      }
      else if((this.routerParts.modeInstance.modeName === 'historyMode')) {
         window.addEventListener("popstate", async () => {
            const previousPath = this.routerParts.modeInstance.popHistoryArray()
            const destAndOriginRoutesObject = {
               fromPath: originRouteObjectGenerator(this.routerParts.routes, previousPath),
               toPath: destinationRouteObjectGenerator(this.routerParts.routes)
            }
            this.routerParts.modeInstance.pushHistoryArray(destAndOriginRoutesObject.toPath.path)

            await this.routeContentLoader(destAndOriginRoutesObject)
         });
      }

      document.body.addEventListener("click", async (element) => {
         if (element.target.localName === "router-link")
            await this.anchorTagNavigator(element)
      })
   }

   async hashChangeGuardNavigator (routerParts ,previousPath) {
      const destAndOriginRoutesObject = {
         fromPath: originRouteObjectGenerator(routerParts.routes, previousPath),
         toPath: destinationRouteObjectGenerator(routerParts.routes)
      }

      const routesAndGuard = {
         destAndOrigin: destAndOriginRoutesObject,
         guardFunction: routerParts.userRouterGuardFunction
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

      const destAndOriginRoutesObject = {
         fromPath: originRouteObjectGenerator(this.routerParts.routes),
         toPath: destinationRouteObjectGenerator(this.routerParts.routes, element)
      }

      const NotARedundantNavigation = destAndOriginRoutesObject.toPath !== destAndOriginRoutesObject.fromPath
      if(NotARedundantNavigation) {
         if(this.routerParts.modeInstance.modeName === 'hashMode')
            this.hashChangeByLink = true

         const routesAndGuard = {
            destAndOrigin: destAndOriginRoutesObject,
            guardFunction: this.routerParts.userRouterGuardFunction
         }

         const destinationPath = routerGuardDestinationPath(routesAndGuard, element)

         this.simpleNavigator(destinationPath)

         await this.routeContentLoader(routesAndGuard.destAndOrigin)
      }
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
