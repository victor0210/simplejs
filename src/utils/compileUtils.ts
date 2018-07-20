import {Watcher} from "../core/Watcher";
import {text} from "./compileSetters";
import {COMPILE_REG} from "../statics/regexp";
import {extractFunction, extractVariable} from "./compileRockers";
import ComponentRendererMixins from "../core/ComponentRendererMixins";
import {isEvent, isProps, isReactiveIDentifier} from "./attributeUtils";
import SimpleNativeComponent from "../core/SimpleNativeComponent";
import {removeAttr} from "./domTransfer";

/**
 * @description: compile text node , replace vm to variable
 * */
export const compileText = (textNode: any, current: SimpleNativeComponent): void => {
    let template = textNode.textContent

    let updater = function () {
        text(textNode, template.replace(COMPILE_REG, (m: any, exp: any) => {
            return extractVariable(exp, current.$vm)
        }))
    }

    updater()
    // current.pushWatcher(new Watcher(updater))
}

/**
 * @description: compile native element's directive && events bind
 * */

export const compileElement = (el: any, current: SimpleNativeComponent): void => {
    const compiler = compileInline(el, current, true)

    // current.injectEvents(compiler.events)
}

/**
 * @description: compile custom components with directive && events && props
 * */
export const compileCustomComponent = (customEl: any, current: SimpleNativeComponent) => {
    let tagName = customEl.tagName.toLowerCase()
    let childComponent = current.$injections.components[tagName]

    const compiler = () => {
        const {props} = compileInline(customEl, current)
        current.injectChild(childComponent)
        childComponent.injectPropsAndParent(current, props)
    }

    let updater = () => {
        compiler()
        childComponent.updateComponent()
    }

    compiler()

    // current.pushWatcher(new Watcher(updater))
    // compileInline(customEl, childComponent)
    ComponentRendererMixins.mountChild(customEl, childComponent)
}

/**
 * @description: directive / event / props compile util
 * */
const compileInline = (el: any, current: SimpleNativeComponent, isElement: boolean = false): any => {
    let props: any = {};
    let events: Array<any> = [];

    Array.from(el.attributes).forEach((attr: any) => {
        let exp = attr.name
        let val = attr.value

        let attributeIDentifier = exp[0]
        if (isReactiveIDentifier(attributeIDentifier)) {
            let key = exp.split(attributeIDentifier)[1]

            if (isProps(exp)) {
                props[key] = extractVariable(val, current.$vm)
            } else if (isEvent(exp)) {
                let event = isElement
                    ? Object.assign({
                        el: el,
                        handler: key
                    }, extractFunction(val, current))
                    : extractFunction(val, current)

                events.push(event)
                removeAttr(el, exp)
            }
        } else {
            props[exp] = val
        }
    })

    return {
        props: props,
        events: events
    }
}