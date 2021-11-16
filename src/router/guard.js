const routerGuard = (to, from, next) => {
   const token = window.localStorage.getItem('access_token')

   if (to.meta.authRequire && !token) {
      next('/')
   }

   else next('')
}

export default routerGuard
