const mainRouteObjectPreparer = (routes) => {
   const routesModel = routes
   routesModel.forEach(route => {
      if("children" in route) {
         route.children.forEach(childRoute => {
            const newRoute = {
               path: route.path + childRoute.path,
               meta: Object.assign(route.meta, childRoute.meta),
               name: childRoute.name,
               component: route.component,
               childComponent: childRoute.component
            }
            routesModel.push(newRoute)
         })
      }

   })
   return routesModel
}

export default mainRouteObjectPreparer
