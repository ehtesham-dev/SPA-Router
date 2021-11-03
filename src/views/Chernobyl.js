import AbstractView from "../../my_modules/router/view/classes/ViewParentClass.js";

export default class extends AbstractView {
   constructor(params) {
      super(params);
   }

   async htmlTemplate() {
      return `
            <section class="chernobyl">
                <h1>YOU ARE NOT ALLOWED TO BE HERE!</h1>
                <p>This route has protected with a router guard that is written by the user and controlled by the Router module, HOW THE HELL YOU GET HERE?</p>
            </section>
        `;
   }

}
