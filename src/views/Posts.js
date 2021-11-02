import AbstractView from "../../my_modules/router/classes/ViewParentClass.js";

export default class extends AbstractView {
    constructor(params) {
        super(params);
        this.setTitle("Posts");
    }

    async htmlTemplate() {
        return `
            <section class="posts">
                    <h1>Posts</h1>
                    <p>You are viewing the posts!</p>
                    <a href="/posts/2" router-link>View Second post</a>
            </section>
        `;
    }
}
