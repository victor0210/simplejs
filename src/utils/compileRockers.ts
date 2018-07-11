import throwIf from "../loggers/throwIf";
import {EXP_SEPARATOR} from "../statics/separators";
import isTempString from "./isTempString";
import {getVM} from "./vmUtils";
import {STRING_NULL} from "../statics/helperType";

export const extractVariable = (exp: string, vm: any): string => {
    let duckVariables: Array<string> = exp.split(EXP_SEPARATOR)

    let escapedString = STRING_NULL

    duckVariables.forEach((duck: string, idx: number) => {
        duck = duck.trim()

        if (!isTempString(duck)) {
            throwIf(!(duck in vm),
                `"${duck}" is not defined but use in the instance`
            )

            escapedString = escapedString === STRING_NULL ? getVM(duck, vm) : escapedString + getVM(duck, vm)
        } else {
            escapedString += duck.slice(1, -1)
        }
    })

    return escapedString
}

export const extractFunction = (exp: string, current: any): any => {
    let duckVariables: Array<string> = exp.split(/\(|\,|\)/)
    arrayExpFormat(duckVariables)

    let cbName: string = duckVariables[0]
    let cbArgs: Array<any> = duckVariables.slice(1)

    return {
        cb: getVM(cbName, current.$vm).bind(current),
        args: cbArgs
    }
}

const arrayExpFormat = (arr: Array<string>): void => {
    if (arr[arr.length - 1].trim() === STRING_NULL) arr.pop()
    arr.forEach((el: string, idx: number) => {
        if (!!el.length) {
            arr[idx] = el.trim()
        } else {
            arr.splice(idx, 1)
        }
    })
}