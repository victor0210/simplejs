import {VM_VAL_POINT_SEPARATOR} from "../statics/separators";
import {VM_VAL_REGEXP} from "../statics/regexp";
import {STRING_NULL} from "../statics/helperType";
import throwIf from "../loggers/throwIf";

export const getVM = (exp: string, vm: any): any => {
    let vals = exp.replace(VM_VAL_REGEXP, VM_VAL_POINT_SEPARATOR).split(VM_VAL_POINT_SEPARATOR)
    let value = vm

    for (let i in vals) {
        throwIf(!(vals[i] in value),
            `"${vals[i]}" is not defined`
        )
        if (vals[i].trim() !== STRING_NULL) value = value[vals[i]]
    }

    return value
}

export const setVM = (expKey: string, value: any, vm: any): void => {
    let vals = expKey.replace(VM_VAL_REGEXP, VM_VAL_POINT_SEPARATOR).split(VM_VAL_POINT_SEPARATOR)
    let val = vm

    for (let i in vals) {
        if (vals[i].trim() !== STRING_NULL) val = val[vals[i]]
    }

    val = value
}