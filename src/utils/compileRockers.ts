import throwIf from "../loggers/throwIf";
import {expSeparator} from "../statics/separators";
import isTempString from "./isTempString";

export const extractVariable = (exp: string, vm: any): string => {
    let duckVariables: Array<string> = exp.split(expSeparator)

    let escapedString = ''

    duckVariables.forEach((duck: string, idx: number) => {
        duck = duck.trim()

        if (!isTempString(duck)) {
            throwIf(!(duck in vm),
                `"${duck}" is not defined but use in the instance`
            )

            escapedString += vm[duck]
        } else {
            escapedString += duck.slice(1, -1)
        }
    })

    return escapedString
}