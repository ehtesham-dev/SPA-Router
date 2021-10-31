import AbstractView from "../router/classes/ViewClassParent.js";

export default class extends AbstractView {
    constructor(routerData) {
        super(routerData);
        console.log('params in view', routerData)
        this.setTitle("Viewing Post");
    }

    async getHtml() {
        return `
            <section class="single-post" >
                <h1>Post</h1>
                <p>You are viewing post #${this.routerData.parameter.id}.</p>
            </section>
        `;
    }
}
