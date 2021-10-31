import routes from "../routes";
import getParams from "./retriveRouteParams"
import pathToRegex from "./convertUrlToRegex";


const router = async () => {
   const potentialMatches = routes.map(route => {
      return {
         route: route,
         result: location.pathname.match(pathToRegex(route.path))
      };
   });

   let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);

   if (!match) {
      match = {
         route: routes[0],
         result: [location.pathname]
      };
   }

   const view = new match.route.view(getParams(match));


   console.log('route', match)
   console.log('params', getParams(match))

   document.querySelector("#app").innerHTML = await view.getHtml();
};

export default router
