import getParams from "./retriveRouteParams";
import findMatchRoute from "./findMatchRoute";

const routeContentLoader = async () => {

   const currentRoute = findMatchRoute()

   console.log('currentRoute', currentRoute)

   const routerData = {
      parameter: getParams(currentRoute)
   }

   const view = new currentRoute.route.view(routerData);

   document.querySelector("#app").innerHTML = await view.getHtml();
}

export default routeContentLoader
