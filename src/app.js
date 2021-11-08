import routes from "./router/routes";
import './assets/style/index.css'
import routerGuard from "./router/guard";
import SPA from "../my_modules/SPA";

const first = new SPA(routes, routerGuard, 'hash')
// const second = new SPA(routes, routerGuard, 'hash')

// console.log('are they same?',second === first);
