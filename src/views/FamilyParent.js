import AbstractView from "../../my_modules/SPA/core/pages/ViewParentClass.js";

export default class Parent extends AbstractView {
   constructor(params) {
      super(params);
   }

   async htmlTemplate() {
      console.log(1)
      return `
            <section class="parent">
                <h1>I am the parent 👴</h1>
                ${this.routerViewOrNavigate()}
                <h3>CAN U SEE ME?</h3>
            </section>
        `;
   }

   routerViewOrNavigate() {
      if (this.routerData.routerView) {
         return `
                <router-view ></router-view>
         `
      }
      else return `
         <p>
           here is my child that inherits its meta and path from me:
           <ul>
               <li><router-link to="/parent/child?hello=world" class="router-link">child 👦</router-link></li>
               <li><router-link to="/parent/second-child" class="router-link">second child 👧</router-link></li>
           </ul>
         </p>
      `
   }

}
