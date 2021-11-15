
class HistoryMode {
   constructor() {
      this.modeName = 'historyMode'
      this.historyArray = []
   }

   navigateTo(destinationPath) {
      this.historyArray.push(destinationPath.split('?')[0])
      history.pushState({destinationPath}, null, destinationPath)
   }

   popHistoryArray() {

      return this.historyArray.pop()
   }

}

export default HistoryMode
