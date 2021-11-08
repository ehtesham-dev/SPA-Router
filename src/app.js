import routes from "./router/routes";
import './assets/style/index.css'
import routerGuard from "./router/guard";
import SPA from "../my_modules/SPA";

window.spa = new SPA(routes, routerGuard, 'hash')

