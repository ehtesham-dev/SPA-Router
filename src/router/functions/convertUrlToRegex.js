const pathToRegex = (path) => {
   return new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");
}

export default pathToRegex
