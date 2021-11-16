const getParams = (currentRoute) => {

   const values = currentRoute.paramArray.slice(1);

   const keys = Array.from(currentRoute.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);

   return Object.fromEntries(keys.map((key, i) => {
      return [key, values[i]];
   }));
};

export default getParams
