import {Watcher} from "./Watcher";

export default class WatcherHub {
    public hubs: Array<any> = []
    public count: number = 0

    addWatcher(watcher: Watcher) {
        this.hubs.push({
            uid: ++this.count,
            watcher: watcher
        })
    }

    notify() {
        this.hubs.forEach((hub: any) => {
            hub.watcher.runUpdater()
        })
    }
}
