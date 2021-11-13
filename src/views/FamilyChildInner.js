import AbstractView from "../../my_modules/SPA/core/pages/ViewParentClass.js";

export default class InnerChild extends AbstractView {
   constructor(params) {
      super(params);
   }

   async htmlTemplate() {
      console.log('Child inner rendered')
      return `
            <section class="child">
                <h1>I am the child in child 🧬</h1>
                <li><router-link to="/parent/second-child/child-in-child/Child-in-infinite" class="router-link">Infinity and beyond</router-link></li>
                <router-view ></router-view>
            </section>
        `;
   }

}
