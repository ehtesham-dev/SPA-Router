export default class {
    constructor(routerData) {
        this.routerData = routerData;
        this.setTitle(this.routerData.name)
    }

    setTitle(title) {
        document.title = title;
    }

    async htmlTemplate() {
        return ''
    }

}
