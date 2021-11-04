import AbstractView from "../../my_modules/SPA/core/classes/ViewParentClass.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
    }

    async htmlTemplate() {
        return `
            <section class="posts">
                    <h1>Posts</h1>
                    <p>You are viewing the posts!</p>
                    <router-link to="/posts/2" class="router-link">View Second post</router-link>
            </section>
        `;
    }
}
