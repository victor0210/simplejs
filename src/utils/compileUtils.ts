import {Watcher} from "../core/Watcher";
import {text} from "./compileSetters";
import {compileReg} from "../statics/regexp";
import {extractVariable} from "./compileRockers";

export const compileText = (textNode: any, current: any): void => {
    let template = textNode.textContent
    let replacer = template

    let updater = function () {
        text(textNode, replacer.replace(compileReg, (m: any, exp: any) => {
            return extractVariable(exp, current.state)
        }))
        replacer = template
    }

    updater()
    current.pushWatcher(new Watcher(current.state, updater))
}

export const compileElement = (elementNode: any): void => {
}

