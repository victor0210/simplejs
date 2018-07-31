import isTempString from "./isTempString";
import {getVM} from "./vmUtils";
import isTempNumber from "./isTempNumber";
import SimpleNativeComponent from "../core/SimpleNativeComponent";
import throwIf from "../loggers/throwIf";
import matchType from "./matchType";
import baseType from "../statics/baseType";
import isTempFunction from "./isTempFunction";
import {STRING_NULL} from "../statics/helperType";

const listenerGenerator = (exp: any, current: SimpleNativeComponent, autoRun: boolean = false) => {
    let funcName
    let funcArgs: Array<any> = []

    exp = exp.trim()

    if (!isTempFunction(exp)) {
        funcName = exp.trim()
    } else {
        let funcArgsStart = exp.indexOf('(')
        funcName = exp.slice(0, funcArgsStart)
        funcArgs = exp.slice(funcArgsStart + 1, exp.length - 1).split(',')
    }

    let cb = getVM(funcName, current.$vm)

    throwIf(!matchType(getVM(funcName, current.$vm), baseType.Function),
        `${funcName} is not a function!`
    )

    let listener = function () {
        let inputArguments: Array<any> = []
        funcArgs.forEach((el: string, idx: number) => {
            el = el.trim()

            if (el !== STRING_NULL) {
                if (!isTempString(el) && !isTempNumber(el) && el.indexOf('(') === -1) {
                    inputArguments[idx] = getVM(el, current.$vm)
                } else if (isTempFunction(el)) {
                    inputArguments[idx] = listenerGenerator(el, current, true)
                } else {
                    inputArguments[idx] = el
                }
            }
        })

        return cb.call(current, ...inputArguments)
    }

    return autoRun ? listener() : listener
}

export default listenerGenerator