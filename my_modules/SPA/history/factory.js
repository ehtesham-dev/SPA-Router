import HistoryMode from "./modes/History";
import HashMode from "./modes/Hash";

class HistoryFactory {
   constructor(mode) {
      switch (mode) {
         case 'hash':
            this.modeInstance = new HashMode()
            break

         case 'history':
         default:
            this.modeInstance = new HistoryMode()
      }
   }

   getModeInstance(){
      return this.modeInstance
   }
}


export default HistoryFactory
