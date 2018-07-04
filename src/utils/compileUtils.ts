import hasKey from "./hasKey";
import throwIf from "../loggers/throwIf";

let compileReg: RegExp = /\{(.*)\}/g
let stringReg: RegExp = /\"(.*)\"/g
let expSeparator = '+'

export const compileText = (textNode: any, vm: any): void => {
    text(textNode, textNode.textContent.replace(compileReg, (m: any, i: any) => {
        return extractVariable(i, vm)
    }))
}

export const compileElement = (elementNode: any): void => {
}

export const text = (node: any, value: any): void => {
    node.textContent = value
}

const extractVariable = (exp: string, vm: any): string => {
    let duckVariables: Array<string> = exp.split(expSeparator)

    duckVariables.forEach((duck: string, idx: number) => {
        if (!stringReg.test(duck)) {
            throwIf(!(duck in vm.data),
                `"${duck.trim()}" is not defined but use in the instance`
            )
            duckVariables[idx] = vm.data[duck.trim()]
        }
    })

    return duckVariables.join('')
}