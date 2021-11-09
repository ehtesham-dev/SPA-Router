const mainRouteObjectPreparer = (routes) => {
   const routesModel = routes
   routesModel.forEach(route => {
      if("children" in route) {
         mainRouteObjectPreparer(route.children)
         route.children.forEach(childRoute => {
            const newRoute = {
               path: route.path + childRoute.path,
               meta: Object.assign(route.meta, childRoute.meta),
               name: childRoute.name,
               parentComponent: route.component,
               childComponents: childRoute.childComponents ? [...childRoute.childComponents, childRoute.parentComponent] : [childRoute.component]
            }
            routesModel.push(newRoute)
         })
      }
   })
   return routesModel
}

export default mainRouteObjectPreparer
