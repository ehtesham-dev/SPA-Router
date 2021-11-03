export default class {
    constructor(routerData) {
        this.routerData = routerData;
        document.title = this.routerData.name;
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
