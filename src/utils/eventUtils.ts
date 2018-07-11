import listenerGenerator from "./listenerGenerator";

export const bindEvent = (el: any, handler: string, cb: Function, args: Array<any>, vm: any) => {
    if (el.addEventListener) {
        el.addEventListener(handler, listenerGenerator(args, vm, cb));
    } else if (el.attachEvent) {
        // for less than ie8
        el.attachEvent(`on${handler}`, listenerGenerator(args, vm, cb));
    }
}

export const unbindEvent = (el: any, handler: string, cb: Function, args: Array<any>, vm: any) => {
    if (el.removeEventListener) {
        el.removeEventListener(handler, listenerGenerator(args, vm, cb));
    } else if (el.detach) {
        // for less than ie8
        el.detach(`on${handler}`, listenerGenerator(args, vm, cb));
    }
}