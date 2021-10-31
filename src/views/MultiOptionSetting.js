import AbstractView from "../router/classes/AbstractionOfView.js";

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
                        <li>Url option : ${this.routerData.parameter.option}</li>
                        <li>Url Value : ${this.routerData.parameter.value}</li>
                    </ul>
            </section>
        `;
   }
}
