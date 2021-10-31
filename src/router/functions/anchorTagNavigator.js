import routeContentLoader from "./routeContentLoader";

const anchorTagNavigator =  element  => {
   if (element.target.matches("[router-link]")) {
      element.preventDefault();
      history.pushState(null, null, element.target.href)
      routeContentLoader()
   }
}

export default anchorTagNavigator
