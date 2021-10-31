import router from "./functions/routing";
import anchorNavigator from "./functions/anchorNavigator";
import routes from "./routes/index";

const routerInstance = () => {
   document.addEventListener("DOMContentLoaded", () => {
      router(routes)
      anchorNavigator()
   });
}

export default routerInstance
