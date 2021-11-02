import AbstractView from "./ViewParentClass.js";

export default class extends AbstractView {
   constructor(params) {
      super(params);
      this.setTitle("Not found");
   }

   async htmlTemplate() {
      return `
            <section class="not-found">
                <h1>Route not Found!</h1>
            </section>
        `;
   }

}
