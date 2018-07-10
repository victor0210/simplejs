import throwIf from "../loggers/throwIf";
import {expSeparator} from "../statics/separators";
import isTempString from "./isTempString";
import {getVM} from "./vmUtils";
import baseType from "../statics/baseType";
import matchType from "./matchType";

export const extractVariable = (exp: string, vm: any): string => {
    let duckVariables: Array<string> = exp.split(expSeparator)

    let escapedString = ''

    duckVariables.forEach((duck: string, idx: number) => {
        duck = duck.trim()

        if (!isTempString(duck)) {
            throwIf(!(duck in vm),
                `"${duck}" is not defined but use in the instance`
            )

            escapedString = escapedString === '' ? getVM(duck, vm) : escapedString + getVM(duck, vm)
        } else {
            escapedString += duck.slice(1, -1)
        }
    })

    return escapedString
}