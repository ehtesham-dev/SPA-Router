import NotFound from "../view/NotFoundPage";

const findMatchRoute = ( routesObject ) => {

   let match = routesObject.find(potentialMatch => potentialMatch.paramArray !== null);

   if (!match) {

      match = {
         route: {
            path: '/not-found',
            name: 'NotFound',
            component: NotFound,
            meta: {}
         },
         paramArray: ['/not-found']
      };
   }

   return match
};

export default findMatchRoute
