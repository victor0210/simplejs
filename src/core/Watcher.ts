export class Watcher {
    public updater: Function

    constructor (updater: Function) {
        this.updater = updater
    }

    public runUpdater() {
        this.updater()
    }
}