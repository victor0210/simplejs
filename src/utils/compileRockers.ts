import throwIf from "../loggers/throwIf";
import {EXP_SEPARATOR} from "../statics/separators";
import isTempString from "./isTempString";
import {getVM} from "./vmUtils";
import {STRING_NULL} from "../statics/helperType";
import listenerGenerator from "./listenerGenerator";
import isTempNumber from "./isTempNumber";
import isTempBoolean from "./isTempBoolean";

export const extractVariable = (exp: string, vm: any): any => {
    //deal boolean specially
    if (isTempBoolean(exp)) {
        return transToBoolean(exp)
    }

    //deal number specially
    if (isTempNumber(exp)) {
        return Number(exp)
    }

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

const transToBoolean = (exp: string): boolean => {
    return exp === 'true'
}