import AbstractView from "../../my_modules/router/view/classes/ViewParentClass.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
    }

    async htmlTemplate() {
        return `
            <h1>Settings</h1>
            <p>Manage your privacy and configuration.</p>
            <a href="/setting/numberOne/numberTwo" router-link>View multi option setting</a>
        `;
    }
}
