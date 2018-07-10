import {vmValPointSeparator} from "../statics/separators";
import {vmValRegexp} from "../statics/regexp";

export const getVM = (exp: string, vm: any): any => {
    let vals = exp.replace(vmValRegexp, vmValPointSeparator).split(vmValPointSeparator)
    let value = vm

    for (let i in vals) {
        if (vals[i].trim() !== '') value = value[vals[i]]
    }

    return value
}

export const setVM = (expKey: string, value: any, vm: any): void => {
    let vals = expKey.replace(vmValRegexp, vmValPointSeparator).split(vmValPointSeparator)
    let val = vm

    for (let i in vals) {
        if (vals[i].trim() !== '') val = val[vals[i]]
    }

    val = value
}