import AbstractView from "../router/classes/AbstractionOfView.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Settings");
    }

    async getHtml() {
        return `
            <h1>Settings</h1>
            <p>Manage your privacy and configuration.</p>
            <a href="/setting/visibility/hidden" router-link>View multi option setting</a>
        `;
    }
}
