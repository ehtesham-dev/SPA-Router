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
import FamilyChildThree from "../views/FamilyChildInner";
import FamilyChildInfinite from "../views/FamilyChildInfinite";

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
      meta: {},
      guard: function (to, from) {
         console.log('Az in var =>', from)
         console.log('Be in var =>', to)
         return ''
      }
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
            meta: {},
         },
         {
            path: "/second-child",
            name: 'SecondChild',
            component: FamilyChildTwo,
            meta: {},
            children: [
               {
                  path: "/child-in-child",
                  name: 'inner-Child',
                  component: FamilyChildThree,
                  meta: {},
                  children: [
                     {
                        path: "/Child-in-infinite",
                        name: 'Child-in-infinite',
                        component: FamilyChildInfinite,
                        meta: {}
                     },
                  ]
               },
            ]
         },
      ]
   },
];

export default routes
