import Dashboard from "../../views/Dashboard";
import Posts from "../../views/Posts";
import PostView from "../../views/PostView";
import Settings from "../../views/Settings";

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
      path: "/post/:id/:number",
      view: PostView
   },
   {
      path: "/settings",
      view: Settings
   }
];

export default routes
