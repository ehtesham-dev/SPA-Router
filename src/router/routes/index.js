import Dashboard from "../../views/Dashboard";
import Posts from "../../views/Posts";
import PostView from "../../views/SinglePost";
import Settings from "../../views/Settings";
import MultiOptionSetting from "../../views/MultiOptionSetting";

const routes = [
   {
      path: "/",
      view: Dashboard
   },
   {
      path: "/posts",
      view: Posts
   },
   {
      path: "/posts/:id",
      view: PostView
   },
   {
      path: "/setting/:option/:value",
      view: MultiOptionSetting
   },
   {
      path: "/settings",
      view: Settings
   }
];

export default routes
