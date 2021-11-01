import AbstractView from "../../my_modules/router/classes/ViewClassParent.js";

export default class extends AbstractView {
   constructor(params) {
      super(params);
      this.setTitle("About");
   }

   async getHtml() {
      return `
            <section class="about">
                <h1>About us</h1>
                <p>
                We try so hard to be at this level, so now we are honor to introduce you
                <br>
                <strong>MAGIC WORD QUERY STRINGS :</strong>
                    <ul>
                        <li>English = ${this.routerData.queryString.magic_word}</li>
                        <li>Persian = ${this.routerData.queryString.in_persian}</li>
                        <li>Russian = ${this.routerData.queryString.in_russian}</li>
                    </ul>
                </p>
            </section>
        `;
   }

}
