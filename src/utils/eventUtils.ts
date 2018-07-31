export const bindEvent = (el: any, handler: string, cb: Function) => {
    if (el.addEventListener) {
        el.addEventListener(handler, cb);
    } else if (el.attachEvent) {
        // for less than ie8
        el.attachEvent(`on${handler}`, cb);
    }
}

export const unbindEvent = (el: any, handler: string, cb: Function) => {
    if (el.removeEventListener) {
        el.removeEventListener(handler, cb);
    } else if (el.detach) {
        // for less than ie8
        el.detach(`on${handler}`, cb);
    }
}

declare let document: any

export const triggerEvent = (el: any, eventName: string) => {
    let event; // The custom event that will be created

    if (document.createEvent) {
        event = document.createEvent("HTMLEvents");
        event.initEvent(eventName, true, true);
    } else {
        event = document.createEventObject();
        event.eventType = eventName;
    }

    event.eventName = eventName;

    if (document.createEvent) {
        return el.dispatchEvent(event);
    } else {
        return el.fireEvent("on" + event.eventType, event);
    }
}