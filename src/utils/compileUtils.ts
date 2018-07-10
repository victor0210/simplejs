import {Watcher} from "../core/Watcher";
import {text} from "./compileSetters";
import {compileReg} from "../statics/regexp";
import {extractVariable} from "./compileRockers";
import ComponentRendererMixins from "../core/ComponentRendererMixins";
import {getCurrentContext} from "../core/RenderCurrent";
import {isDirective, isEvent, isProps, isReactiveIDentifier} from "./attributeUtils";
import SimpleNativeComponent from "../core/SimpleNativeComponent";
import {getVM} from "./vmUtils";

/**
 * @description: compile text node , replace vm to variable
 * */
export const compileText = (textNode: any, current: any): void => {
    let template = textNode.textContent

    let updater = function () {
        text(textNode, template.replace(compileReg, (m: any, exp: any) => {
            return extractVariable(exp, current.$vm)
        }))
    }

    updater()
    current.pushWatcher(new Watcher(updater))
}

/**
 * @description: compile native element's directive && events bind
 * */
export const compileElement = (elementNode: any, current: any): void => {
    // compile directive / events / props
    // console.log(elementNode, current)
}

/**
 * @description: compile custom components with directive && events && props
 * */
export const compileCustomComponent = (customEl: any, current: any) => {
    let tagName = customEl.tagName.toLowerCase()
    let childComponent = current.$injections.components[tagName]

    let updater = function () {
        compileInline(customEl, childComponent, current)
        childComponent.updateComponent()
    }

    compileInline(customEl, childComponent, current)

    current.pushWatcher(new Watcher(updater))
    // compileInline(customEl, childComponent)
    ComponentRendererMixins.mountChild(customEl, childComponent)
}

/**
 * @description: directive / event / props compile util
 * */
const compileInline = (el: any, component: SimpleNativeComponent, current: any) => {
    let props: any = {};

    [].slice.call(el.attributes).forEach((attr: any) => {
        let exp = attr.name
        let val = attr.value

        let attributeIDentifier = exp[0]
        if (isReactiveIDentifier(attributeIDentifier)) {
            let key = exp.split(attributeIDentifier)[1]

            if (isProps(exp)) {
                props[key] = extractVariable(val, current.$vm)
            }
        } else {
            props[exp] = val
        }
    })

    component.injectPropsFromParent(props)
}