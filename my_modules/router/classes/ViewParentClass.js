export default class {
    constructor(routerData) {
        this.routerData = routerData;
    }

    setTitle(title) {
        document.title = title;
    }

    async htmlTemplate() {
        return ''
    }

}
