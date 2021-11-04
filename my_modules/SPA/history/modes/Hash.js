class HashMode {
   constructor() {
      console.log('Hash mode triggered')
      this.setup()
   }

   setup() {
      if(!window.location.hash) window.location.hash = '#/'
   }

   navigateTo(route) {
      window.location.hash = route
   }

}

export default HashMode
