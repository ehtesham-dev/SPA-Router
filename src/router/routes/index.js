import Dashboard from "../../views/Dashboard";
import Posts from "../../views/Posts";
import PostView from "../../views/SinglePost";
import Settings from "../../views/Settings";
import MultiOptionSetting from "../../views/MultiOptionSetting";
import About from "../../views/About";

const routes = [
   {
      path: "/",
      component: Dashboard
   },
   {
      path: "/posts",
      component: Posts
   },
   {
      path: "/posts/:id",
      component: PostView
   },
   {
      path: "/settings",
      component: Settings
   },
   {
      path: "/setting/:first/:second",
      component: MultiOptionSetting
   },
   {
      path: "/about",
      component: About
   },
];

export default routes
