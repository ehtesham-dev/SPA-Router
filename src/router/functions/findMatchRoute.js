import routes from "../routes";
import pathToRegex from "./convertUrlToRegex";
import NotFound from "../classes/NotFoundPage";


const findMatchRoute = () => {
   const potentialMatches = routes.map(route => {
      return {
         route: route,
         result: location.pathname.match(pathToRegex(route.path))
      };
   });

   let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);

   if (!match) {
      match = {
         route: {
            path: '/not-found',
            view: NotFound
         },
         result: ['/not-found']
      };
   }

   return match
};

export default findMatchRoute
