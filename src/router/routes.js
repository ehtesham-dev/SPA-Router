import Dashboard from "../views/Dashboard";
import Posts from "../views/Posts";
import PostView from "../views/SinglePost";
import Settings from "../views/Settings";
import MultiOptionSetting from "../views/MultiOptionSetting";
import MagicWord from "../views/MagicWord";
import Chernobyl from "../views/Chernobyl";
import FamilyParent from "../views/FamilyParent";
import FamilyChild from "../views/FamilyChild";
import FamilyChildTwo from "../views/FamilyChildTwo";

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
      meta: {}
   },
   {
      path: "/setting/:first/:second",
      name: 'MultiOption',
      component: MultiOptionSetting,
      meta: {}
   },
   {
      path: "/magic-word",
      name: 'MagicWord',
      component: MagicWord,
      meta: {}
   },
   {
      path: "/chernobyl",
      name: 'Chernobyl',
      component: Chernobyl,
      meta: {
         authRequire : true
      }
   },
   {
      path: "/parent",
      name: 'Parent',
      component: FamilyParent,
      meta: {
         skyIsBlue: true
      },
      children: [
         {
            path: "/child",
            name: 'Child',
            component: FamilyChild,
            meta: {}
         },
         {
            path: "/second-child",
            name: 'SecondChild',
            component: FamilyChildTwo,
            meta: {}
         },
      ]
   },
];

routes.mode = 'history'

export default routes
