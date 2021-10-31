import router from "./routing";

const anchorNavigator = () => {
   document.body.addEventListener("click", e => {
      if (e.target.matches("[data-link]")) {
         e.preventDefault();
         history.pushState(null, null, e.target.href);
         router();
      }
   });
}

export default anchorNavigator
