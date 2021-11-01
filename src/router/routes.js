import Dashboard from "../views/Dashboard";
import Posts from "../views/Posts";
import PostView from "../views/SinglePost";
import Settings from "../views/Settings";
import MultiOptionSetting from "../views/MultiOptionSetting";
import About from "../views/About";

const routes = [
   {
      path: "/",
      name: 'Home',
      component: Dashboard,
      meta: {}
   },
   {
      path: "/posts",
      name: 'PostArchive',
      component: Posts,
      meta: {}
   },
   {
      path: "/posts/:id",
      name: 'PostSingle',
      component: PostView,
      meta: {}
   },
   {
      path: "/settings",
      name: 'Setting',
      component: Settings,
      meta: {
         authRequire: true
      }
   },
   {
      path: "/setting/:first/:second",
      name: 'MultiOption',
      component: MultiOptionSetting,
      meta: {}
   },
   {
      path: "/about",
      name: 'About',
      component: About,
      meta: {}
   },
];

export default routes
