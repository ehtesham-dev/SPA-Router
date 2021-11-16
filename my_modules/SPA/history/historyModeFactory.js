import HistoryMode from "./modes/History";
import HashMode from "./modes/Hash";

class HistoryFactory {
   constructor(mode) {
      switch (mode) {
         case 'hash':
            return new HashMode()
         case 'history':
         default:
            return new HistoryMode()
      }
   }
}


export default HistoryFactory
