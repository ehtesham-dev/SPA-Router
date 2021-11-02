export default class {
    constructor(routerData) {
        this.routerData = routerData;
    }

    routerView() {
        return this.routerData.routerView
    }

    setTitle(title) {
        document.title = title;
    }

    async htmlTemplate() {
        return ''
    }

}
