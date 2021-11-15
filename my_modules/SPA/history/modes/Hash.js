
class HashMode {
   constructor() {
      this.setup()
      this.modeName = 'hashMode'
      this.initialHashLoad = true
   }

   setup() {
      if(!window.location.hash) {
         window.location.hash = '#/'
      }
   }

   navigateTo(route) {
      this.initialHashLoad = false
      window.location.hash = route
   }

}

export default HashMode
