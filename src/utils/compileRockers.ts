import throwIf from "../loggers/throwIf";
import {expSeparator} from "../statics/separators";
import isTempString from "./isTempString";


export const extractVariable = (exp: string, vm: any): string => {
    let duckVariables: Array<string> = exp.split(expSeparator)

    duckVariables.forEach((duck: string, idx: number) => {
        if (!isTempString(duck)) {
            throwIf(!(duck.trim() in vm),
                `"${duck.trim()}" is not defined but use in the instance`
            )
            duckVariables[idx] = `"${vm[duck.trim()]}"`
        }
    })

    return eval(duckVariables.join('+'))
}