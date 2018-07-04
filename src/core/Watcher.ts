export class Watcher {
    public updater: Function

    constructor (vm: any, updater: Function) {
        this.updater = updater
    }

    public runUpdater() {
        this.updater()
    }
}