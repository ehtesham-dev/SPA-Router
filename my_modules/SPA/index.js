import RouterLink from "./elements/router-link";
import RouterView from "./elements/router-view";
import Router from "./router/router";


export default class SPA {
   constructor(routes, userRouterGuardFunction, mode = 'hash') {
      if (typeof SPA.instance === 'object') {
         return SPA.instance
      }
      SPA.instance = this
      customElements.define('router-link', RouterLink);
      customElements.define('router-view', RouterView);
      this.Router = new Router(routes, userRouterGuardFunction, mode)
      this.onDOMReady()
   }


   onDOMReady() {
      document.addEventListener("DOMContentLoaded", async () => {

         await this.Router.routerInitialLoad()

         this.Router.triggerEventListeners()
      });
   }
}
