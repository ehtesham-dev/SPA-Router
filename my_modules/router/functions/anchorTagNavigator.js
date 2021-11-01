import routeContentLoader from "./routeContentLoader";

const anchorTagNavigator = (element, routes, destination) => {
   element.preventDefault();

   const destinationPath = destination.length ? location.origin + destination : element.target.href

   history.pushState(null, null, destinationPath)

   routeContentLoader(routes)
}

export default anchorTagNavigator

