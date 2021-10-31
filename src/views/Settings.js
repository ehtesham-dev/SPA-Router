import AbstractView from "../router/classes/ViewClassParent.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Settings");
    }

    async getHtml() {
        return `
            <h1>Settings</h1>
            <p>Manage your privacy and configuration.</p>
            <a href="/setting/numberOne/numberTwo" router-link>View multi option setting</a>
        `;
    }
}
