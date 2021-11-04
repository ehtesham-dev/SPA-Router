import AbstractView from "../../my_modules/SPA/core/classes/ViewParentClass.js";

export default class extends AbstractView {
   constructor(params) {
      super(params);
   }

   async htmlTemplate() {
      return `
            <section class="posts">
                    <h1>Multi Setting</h1>
                    <p>Now you can see we can handle multi parameters</p>
                    <ul>
                        <li>First parameter : ${this.routerData.parameter.first}</li>
                        <li>Second parameter : ${this.routerData.parameter.second}</li>
                    </ul>
            </section>
        `;
   }
}
