import AbstractView from "../../my_modules/SPA/core/classes/ViewParentClass.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
    }

    async htmlTemplate() {
        return `
            <h1>Settings</h1>
            <p>Manage your privacy and configuration.</p>
            <router-link to="/setting/numberOne/numberTwo" class="router-link">View multi option setting</router-link>
        `;
    }
}
