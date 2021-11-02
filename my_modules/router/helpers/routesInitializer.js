
const routesInitializer = (routes) => {
   const routesModel = routes
   routesModel.forEach(route => {
      if("children" in route) {
         route.children.forEach(childRoute => {
            childRoute.path = route.path + childRoute.path
            childRoute.meta = Object.assign(route.meta, childRoute.meta)
            routesModel.push(childRoute)
         })
         delete route['children']
      }

   })
   return routesModel
}

export default routesInitializer
