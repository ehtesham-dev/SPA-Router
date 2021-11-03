import routerInstance from "../my_modules/router";
import routes from "./router/routes";
import './assets/style/index.css'
import routerGuard from "./router/guard";

routerInstance(routes, routerGuard)
