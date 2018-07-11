import isTempString from "./isTempString";
import {getVM} from "./vmUtils";
import isTempNumber from "./isTempNumber";

const listenerGenerator = (args: any, vm: any, cb: Function) => {
    return function () {
        let inputArguments: Array<any> = []
        args.forEach((el: string, idx: number) => {
            if (!isTempString(el) && !isTempNumber(el)) {
                inputArguments[idx] = getVM(el, vm)
            } else {
                inputArguments[idx] = el
            }
        })

        cb(...inputArguments)
    }
}

export default listenerGenerator