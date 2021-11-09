import AbstractView from "../../my_modules/SPA/core/pages/ViewParentClass.js";

export default class SecondChild extends AbstractView {
   constructor(params) {
      super(params);
   }

   async htmlTemplate() {
      return `
            <section class="child">
                <h1>I am the second Child 👧</h1>
                <p>
                    I'm a kid but I know many things from my parent, like my "meta" and my "path"
                </p>
                 <li><router-link to="/parent/second-child/child-in-child" class="router-link">Inner child</router-link></li>
                 <router-view ></router-view>
            </section>
        `;
   }

}
