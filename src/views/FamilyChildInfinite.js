import AbstractView from "../../my_modules/SPA/core/pages/ViewParentClass.js";

export default class InfiniteChild extends AbstractView {
   constructor(params) {
      super(params);
   }

   async htmlTemplate() {
      return `
            <section class="child">
                <h1>INFINITY CHIIIIIIILD 🚀</h1>
            </section>
        `;
   }

}
