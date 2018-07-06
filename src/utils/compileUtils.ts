import {Watcher} from "../core/Watcher";
import {text} from "./compileSetters";
import {compileReg} from "../statics/regexp";
import {extractVariable} from "./compileRockers";
import ComponentRendererMixins from "../core/ComponentRendererMixins";
import {getCurrentContext} from "../core/RenderCurrent";

export const compileText = (textNode: any, current: any = getCurrentContext()): void => {
    let template = textNode.textContent

    let updater = function () {
        text(textNode, template.replace(compileReg, (m: any, exp: any) => {
            return extractVariable(exp, current.state)
        }))
    }

    updater()
    current.pushWatcher(new Watcher(updater))
}

export const compileElement = (elementNode: any, current: any = getCurrentContext()): void => {
    //compile directive / events / props
}

export const compileCustomComponent = (customEl: any, current: any = getCurrentContext()) => {
    let tagName = customEl.tagName.toLowerCase()

    if (tagName in current.injectionComponents) {
        ComponentRendererMixins.mountChild(customEl.parentNode, current.injectionComponents[tagName])

        // remove inject component html tag from root
        customEl.remove()
    }
}