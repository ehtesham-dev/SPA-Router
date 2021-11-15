import AbstractView from "../../my_modules/SPA/core/pages/ViewParentClass.js";

export default class Parent extends AbstractView {
   constructor(params) {
      super(params);
   }

   async htmlTemplate() {
      console.log('**********','Parent rendered')
      return `
            <section class="parent">
                <h1>I am the parent 👴</h1>
                <router-view ></router-view>
                <p class="border-top">
                    here is my child that inherits its meta and path from me:
                    <ul>
                        <li><router-link to="/parent/child?hello=world" class="router-link">child 👦</router-link></li>
                        <li><router-link to="/parent/second-child" class="router-link">second child 👧</router-link></li>
                    </ul>
                </p>
            </section>
        `;
   }

}
