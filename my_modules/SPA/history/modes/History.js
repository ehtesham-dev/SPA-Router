
class HistoryMode {
   constructor() {
      this.modeName = 'historyMode'
      this.historyArray = []
   }

   navigateTo(destinationPath) {
      this.pushHistoryArray(destinationPath)
      history.pushState({destinationPath}, null, destinationPath)
   }

   pushHistoryArray(path) {
      this.historyArray.push(path.split('?')[0])
   }

   popHistoryArray() {
      return this.historyArray.pop()
   }

}

export default HistoryMode
