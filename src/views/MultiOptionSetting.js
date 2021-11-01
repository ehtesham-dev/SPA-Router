import AbstractView from "../../my_modules/router/classes/ViewClassParent.js";

export default class extends AbstractView {
   constructor(params) {
      super(params);
      this.setTitle("Multi Setting");
   }

   async getHtml() {
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
