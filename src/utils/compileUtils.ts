import {Watcher} from "../core/Watcher";
import {text} from "./compileSetters";
import {compileReg} from "../statics/regexp";
import {extractVariable} from "./compileRockers";
import ComponentRendererMixins from "../core/ComponentRendererMixins";
import {getCurrentContext} from "../core/RenderCurrent";
import {isAvailableIDentifier, isDirective, isEvent, isProps} from "./attributeUtils";

export const compileText = (textNode: any, current: any): void => {
    let template = textNode.textContent

    let updater = function () {
        text(textNode, template.replace(compileReg, (m: any, exp: any) => {
            return extractVariable(exp, current.state)
        }))
    }

    updater()
    current.pushWatcher(new Watcher(updater))
}

export const compileElement = (elementNode: any, current: any): void => {
    //compile directive / events / props
}

export const compileCustomComponent = (customEl: any, current: any) => {
    let tagName = customEl.tagName.toLowerCase()

    if (tagName in current.injectionComponents) {
        let childComponent = current.injectionComponents[tagName]

        // compileInline(customEl, childComponent)
        ComponentRendererMixins.mountChild(customEl.parentNode, childComponent)

        // remove inject component html tag from root
        customEl.remove()
    }
}

const compileInline = (el: any, component: any) => {
    //[].slice.call(node.attributes).forEach(attr => {
    //     if (isEvent) {
    //         injectEvent
    //     } else if (isProp) {
    //         injectProp
    //     } else if (isDirective) {
    //         compileDirective
    //     }
    // })
    // let props: any = {};
    // let events: any = {};
    // let directives: any = {};
    //
    // [].slice.call(el.attributes).forEach((attr: any) => {
    //     let key = attr.name
    //     let val = attr.value
    //
    //     let attributeIDentifier = key[0]
    //     if (isAvailableIDentifier(attributeIDentifier)) {
    //         key = key.split(attributeIDentifier)[1]
    //
    //         if (isProps(key)) {
    //             props[key] = val
    //         } else if (isEvent(key)) {
    //             events[key] = val
    //         } else if (isDirective(key)) {
    //             directives[key] = val
    //         }
    //     }
    // })

    // props && component.injectProps(props)
    // events && component.injectEvents(events)
}