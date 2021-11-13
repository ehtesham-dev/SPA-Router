
class HashMode {
   constructor() {
      this.setup()
      this.modeName = 'hashMode'
      this.hashHistoryArray = []
   }

   setup() {
      if(!window.location.hash) {
         window.location.hash = '#/'
      }
   }

   navigateTo(route) {
      this.hashHistoryArray.push(route.split('?')[0])
      window.location.hash = route
   }

   popHashHistoryArray() {
      return this.hashHistoryArray.pop()
   }

}

export default HashMode
