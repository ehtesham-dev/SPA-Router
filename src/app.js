import routes from "./router/routes";
import './assets/style/index.css'
import routerGuard from "./router/guard";
import Router from "../my_modules/SPA";

window.router = new Router(routes, routerGuard, 'hash')
