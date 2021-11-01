import NotFound from "../classes/NotFoundPage";

const findMatchRoute = ( routesObject ) => {

   let match = routesObject.find(potentialMatch => potentialMatch.paramArray !== null);

   if (!match) {

      match = {
         route: {
            path: '/not-found',
            component: NotFound
         },
         paramArray: ['/not-found']
      };
   }

   return match
};

export default findMatchRoute
