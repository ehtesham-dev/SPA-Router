class HistoryMode {
   constructor() {
      this.modeName = 'historyMode'
   }

   navigateTo(destinationPath) {
      history.pushState(null, null, destinationPath)
   }
}

export default HistoryMode
