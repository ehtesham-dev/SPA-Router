import AbstractView from "../../my_modules/router/view/ViewParentClass.js";

export default class extends AbstractView {
   constructor(params) {
      super(params);
      this.setTitle("Second Child");
   }

   async htmlTemplate() {
      return `
            <section class="child">
                <h1>I am the second Child 👧</h1>
                <p>
                    I'm a kid but I know many things from my parent, like my "meta" and my "path"
                </p>
            </section>
        `;
   }

}
