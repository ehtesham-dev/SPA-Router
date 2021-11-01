const routerGuard = (to, from) => {
   const hasToken = false
   let destination = ''

   if (to.meta.authRequire && hasToken === false) {
      destination = '/'
   }

   return destination
}

export default routerGuard
