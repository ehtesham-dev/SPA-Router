import RouterLink from "./elements/router-link";
import RouterView from "./elements/router-view";
import HistoryFactory from "./history/factory";
import RouteContentLoader from "./core/RouteContentLoader";
import routesConverter from "./router/routesConverter";
import routerGuardDestinationPath from "./router/routerGuardDestinationPath";
import pathGenerator from "./router/currentPathGenerator";


export default class SPA {
   constructor(routes, userRouterGuardFunction, mode = 'hash') {
      customElements.define('router-link', RouterLink);
      customElements.define('router-view', RouterView);
      this.routerPart = {
         routes: routesConverter(routes),
         userRouterGuardFunction,
         modeInstance: new HistoryFactory(mode).getModeInstance()
      }
      this.onDOMReady()
      this.viewObject = new RouteContentLoader(this.routerPart.routes)
   }

   async routeContentLoader() {
      return this.viewObject.routeContentLoad();
   }

   onDOMReady() {
      document.addEventListener("DOMContentLoaded", async() => {
         window.addEventListener("popstate", async () => {
            await this.routeContentLoader()
         });

         if (this.routerPart.modeInstance.constructor.name === 'HashMode')
            window.addEventListener('hashchange', async () => {
               await this.routerInitialLoad(this.routerPart)
            }, false);
         await this.routerInitialLoad()

         document.body.addEventListener("click", async ( element ) => {
            if (element.target.localName === "router-link")
               await this.anchorTagNavigator(element)
         })
      });
   }

    async anchorTagNavigator(element) {
      element.preventDefault();

      const routesAndGuard = {
         routes: this.routerPart.routes,
         guardFunction: this.routerPart.userRouterGuardFunction
      }
      const destinationPath = routerGuardDestinationPath(routesAndGuard, element)

      this.routerPart.modeInstance.navigateTo(destinationPath)

      await this.routeContentLoader()
   }

   async routerInitialLoad() {
      const routesAndGuard = {
         routes: this.routerPart.routes,
         guardFunction: this.routerPart.userRouterGuardFunction
      }
      const guardDestination = routerGuardDestinationPath(routesAndGuard)

      if (guardDestination === pathGenerator())
         await this.routeContentLoader()
      else {
         this.routerPart.modeInstance.navigateTo(guardDestination)
         await this.routeContentLoader()
      }
   }
}
