const childrenRouterView = async ( currentRouteObject, constructorPayload) => {

   let classConstructorData = constructorPayload

   if("childComponent" in currentRouteObject) {
      const childViewComponent = new currentRouteObject.childComponent(constructorPayload)
      classConstructorData.routerView = await childViewComponent.htmlTemplate()
   }

   return classConstructorData
}

export default childrenRouterView
