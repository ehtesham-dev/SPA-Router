class HistoryMode {
   constructor() {
      console.log('History mode triggered')
   }

   navigateTo(destinationPath) {
      history.pushState(null, null, destinationPath)
   }
}

export default HistoryMode
