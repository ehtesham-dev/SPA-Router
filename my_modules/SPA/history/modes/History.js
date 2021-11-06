class HistoryMode {
   constructor() {
   }

   navigateTo(destinationPath) {
      history.pushState(null, null, destinationPath)
   }
}

export default HistoryMode
