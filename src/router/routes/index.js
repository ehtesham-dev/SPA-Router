import Dashboard from "../../views/Dashboard";
import Posts from "../../views/Posts";
import PostView from "../../views/SinglePost";
import Settings from "../../views/Settings";
import MultiOptionSetting from "../../views/MultiOptionSetting";

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
      path: "/setting/:first/:second",
      component: MultiOptionSetting
   },
   {
      path: "/settings",
      component: Settings
   }
];

export default routes
