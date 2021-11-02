const routerGuard = (to, from) => {
   const token = window.localStorage.getItem('access_token')
   let destination = ''

   if (to.meta.authRequire && !token) {
      destination = '/'
   }

   return destination
}

export default routerGuard
