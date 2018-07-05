import {Watcher} from "../core/Watcher";
import {text} from "./compileSetters";
import {compileReg} from "../statics/regexp";
import {extractVariable} from "./compileRockers";
import ComponentRendererMixins from "../core/ComponentRendererMixins";

export const compileText = (textNode: any, current: any): void => {
    let template = textNode.textContent
    let replacer = template

    let updater = function () {
        text(textNode, replacer.replace(compileReg, (m: any, exp: any) => {
            console.log(m, exp)
            return extractVariable(exp, current.state)
        }))
        replacer = template
    }

    updater()
    current.pushWatcher(new Watcher(current.state, updater))
}

export const compileElement = (elementNode: any, current: any): void => {
    let tagName = elementNode.tagName.toLowerCase()

    if (tagName in current.injectionComponents) {
        // elementNode.parentNode.removeChild(elementNode)
        ComponentRendererMixins.mount(elementNode.parentNode, current.injectionComponents[tagName])
        elementNode.parentNode.removeChild(elementNode)
    }
}

