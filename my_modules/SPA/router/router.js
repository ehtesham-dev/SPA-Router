import HistoryFactory from "../history/factory";
import CoreContentLoader from "../core/CoreContentLoader";
import mainRouteObjectPreparer from "./utils/mainRouteObjectPreparer";
import routerGuardDestinationPath from "./utils/routerGuardDestinationPath";
import pathGenerator from "./utils/currentPathGenerator";


export default class Router {
   constructor(routes, userRouterGuardFunction, mode) {
      this.routerParts = {
         routes: mainRouteObjectPreparer(routes),
         userRouterGuardFunction,
         modeInstance: new HistoryFactory(mode).getModeInstance()
      }
      this.coreObject = new CoreContentLoader(this.routerParts.routes)
   }

   async routeContentLoader() {
      return this.coreObject.routeContentLoad();
   }

   triggerEventListeners() {
      window.addEventListener("popstate", async () => {
         await this.routeContentLoader()
      });

      if (this.routerParts.modeInstance.modeName === 'hashMode')
         window.addEventListener('hashchange', async () => {
            await this.routerInitialLoad(this.routerParts)
         }, false);

      document.body.addEventListener("click", async (element) => {
         if (element.target.localName === "router-link")
            await this.anchorTagNavigator(element)
      })
   }

   simpleNavigator(destinationPath) {
      this.routerParts.modeInstance.navigateTo(destinationPath)
   }

   async anchorTagNavigator(element) {
      element.preventDefault();

      const routesAndGuard = {
         routes: this.routerParts.routes,
         guardFunction: this.routerParts.userRouterGuardFunction
      }
      const destinationPath = routerGuardDestinationPath(routesAndGuard, element)

      this.simpleNavigator(destinationPath)

      await this.routeContentLoader()
   }

   async routerInitialLoad() {
      const routesAndGuard = {
         routes: this.routerParts.routes,
         guardFunction: this.routerParts.userRouterGuardFunction
      }
      const guardDestination = routerGuardDestinationPath(routesAndGuard)

      if (guardDestination === pathGenerator())
         await this.routeContentLoader()
      else {
         this.simpleNavigator(guardDestination)
         await this.routeContentLoader()
      }
   }
}
