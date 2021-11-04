import AbstractView from "../../my_modules/router/view/ViewParentClass.js";

export default class extends AbstractView {
    constructor(routerData) {
        super(routerData);
    }

    async htmlTemplate() {
        return `
            <section class="single-post" >
                <h1>Post</h1>
                <p>You are viewing post #${this.routerData.parameter.id}.</p>
            </section>
        `;
    }
}
