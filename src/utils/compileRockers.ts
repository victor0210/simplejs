import {EXP_SEPARATOR, METHOD_STARTER} from "../statics/separators";
import {getVM} from "./vmUtils";
import {STRING_NULL, STRING_TRUE} from "../statics/helperType";
import equal from "./equal";
import SimpleNativeComponent from "../core/SimpleNativeComponent";
import {isTempBoolean, isTempNumber, isTempString} from "./tempMatcher";

export const extractVariable = (exp: string, vm: any): any => {
    if (!exp) return
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

    duckVariables.forEach((duck: string) => {
        duck = duck.trim().replace('this.', '')

        if (!isTempString(duck)) {
            escapedString = equal(escapedString, STRING_NULL) ? getVM(duck, vm) : escapedString + getVM(duck, vm)
        } else {
            escapedString += duck.slice(1, -1)
        }
    })

    return escapedString
}

export const extractFunction = (exp: string, component: SimpleNativeComponent): any => {
    return function () {
        let func: any
        let params: any

        let splitIndex = exp.indexOf(METHOD_STARTER)
        if (splitIndex !== -1) {
            func = extractVariable(exp.slice(0, splitIndex), component.$vm)
            params = exp.slice(splitIndex + 1, -1).split(',')
        } else {
            func = extractVariable(exp, component.$vm)
            params = []
        }

        params && params.forEach((param: any, idx: number) => {
            params[idx] = extractVariable(param, component.$vm)
        })
        func.call(component, ...params)
    }
}

const transToBoolean = (exp: string): boolean => {
    return equal(exp, STRING_TRUE)
}