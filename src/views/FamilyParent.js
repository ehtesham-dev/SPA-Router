import AbstractView from "../../my_modules/router/view/ViewParentClass.js";

export default class extends AbstractView {
   constructor(params) {
      super(params);
      this.setTitle("Parent");
   }

   async htmlTemplate() {
      if(this.routerView()) {
         return this.routerView()
      }
      else return`
            <section class="parent">
                <h1>I am the parent 👴</h1>
                <p>
                    here is my child that inherits its meta and path from me:
                 <ul>
                     <li><a href="/parent/child?hello=world" router-link>child 👦</a></li>
                     <li><a href="/parent/second-child" router-link>second child 👧</a></li>
                 </ul>
                </p>
            </section>
        `;
   }

}
