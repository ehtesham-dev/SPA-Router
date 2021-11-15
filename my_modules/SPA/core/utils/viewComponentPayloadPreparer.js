import pathRegex from "../../router/utils/pathRegex";
import pathGenerator from "../../router/utils/currentPathOrHashGenerator";

const viewComponentPayloadPreparer = (routes ) => {

   return routes.map(route => {
      return {
         route,
         paramArray: pathGenerator().match(pathRegex(route.path)),
      }
   })
};

export default viewComponentPayloadPreparer
