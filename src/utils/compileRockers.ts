import throwIf from "../loggers/throwIf";
import {EXP_SEPARATOR} from "../statics/separators";
import isTempString from "./isTempString";
import {getVM} from "./vmUtils";
import {STRING_NULL} from "../statics/helperType";
import listenerGenerator from "./listenerGenerator";

export const extractVariable = (exp: string, vm: any): string => {
    let duckVariables: Array<string> = exp.split(EXP_SEPARATOR)

    let escapedString = STRING_NULL

    duckVariables.forEach((duck: string, idx: number) => {
        duck = duck.trim().replace('this.', '')

        if (!isTempString(duck)) {
            escapedString = escapedString === STRING_NULL ? getVM(duck, vm) : escapedString + getVM(duck, vm)
        } else {
            escapedString += duck.slice(1, -1)
        }
    })

    return escapedString
}

export const extractFunction = (exp: string, current: any): any => {
    return {
        cb: listenerGenerator(exp, current)
    }
}

export const arrayExpFormat = (arr: Array<string>): void => {
    if (arr[arr.length - 1].trim() === STRING_NULL) arr.pop()
    arr.forEach((el: string, idx: number) => {
        if (!!el.length) {
            arr[idx] = el.trim()
        } else {
            arr.splice(idx, 1)
        }
    })
}