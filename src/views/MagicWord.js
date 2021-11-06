import AbstractView from "../../my_modules/SPA/core/pages/ViewParentClass.js";

export default class extends AbstractView {
   constructor(params) {
      super(params);
   }

   async htmlTemplate() {
      return `
            <section class="about">
                <h1>Magic Words</h1>
                <p>
                We tried so hard to be at this level, so now we are honored to introduce you
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
