class HashMode {
   constructor() {
      this.setup()
      this.modeName = 'hashMode'
   }

   setup() {
      if(!window.location.hash) {
         window.location.hash = '#/'
      }
   }

   navigateTo(route) {
      window.location.hash = route
   }

}

export default HashMode
