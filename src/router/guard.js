const routerGuard = (to, from) => {
   const hasToken = true
   let destination = ''

   if (to.meta.authRequire && hasToken === false) {
      destination = '/'
   }

   return destination
}

export default routerGuard
