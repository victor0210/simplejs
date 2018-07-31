import {COMPILE_REG} from "../statics/regexp";
import {extractFunction, extractVariable} from "./compileRockers";
import ComponentRendererMixins from "../core/ComponentRendererMixins";
import {isEvent, isProps, isReactiveIDentifier} from "./attributeUtils";
import SimpleNativeComponent from "../core/SimpleNativeComponent";
import {removeAttr, transToDom} from "./domTransfer";
import {ElementNodeType, TextNodeType} from "../statics/nodeType";
import equal from "./equal";
import VNode from "../core/VNode";

export const compile2VNode = (template: string, component: SimpleNativeComponent) => {
    let dom = transToDom(template)

    return compile(dom, component)
}

const compile = (dom: any, component: SimpleNativeComponent): VNode => {
    if (equal(dom.nodeType, ElementNodeType)) {
        if (isCustomComponent(dom.tagName, component.$context.components)) {
            return compileCustomComponent(dom, component)
        } else {
            return compileElement(dom, component)
        }
    } else if (equal(dom.nodeType, TextNodeType)) {
        return compileText(dom, component)
    }
}

/**
 * @description: compile text node , replace vm to variable
 * */
export const compileText = (textNode: any, current: SimpleNativeComponent): VNode => {
    let template = textNode.textContent

    let textContent = template.replace(COMPILE_REG, (m: any, exp: any) => {
        return extractVariable(exp, current.$vm)
    })

    return new VNode(
        textContent,
        {},
        [],
        true,
        false,
        current
    )
}

/**
 * @description: compile native element's directive && events bind
 * */

export const compileElement = (el: any, current: SimpleNativeComponent): VNode => {
    return compileInline(el, current, true)
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
const compileInline = (el: any, component: SimpleNativeComponent, isElement: boolean = false): VNode => {
    let props: any = {};
    let domProps: any = {};
    let events: Array<any> = [];

    Array.from(el.attributes).forEach((attr: any) => {
        let exp = attr.name
        let val = attr.value

        let attributeIDentifier = exp[0]
        if (isReactiveIDentifier(attributeIDentifier)) {
            let key = exp.split(attributeIDentifier)[1]

            if (isProps(exp)) {
                if (isElement) {
                    props[key] = extractVariable(val, component.$vm)
                } else {
                    domProps[key] = extractVariable(val, component.$vm)
                }
            } else if (isEvent(exp)) {
                let event = isElement
                    ? Object.assign({
                        el: el,
                        handler: key
                    }, extractFunction(val, component))
                    : extractFunction(val, component)

                events.push(event)
                removeAttr(el, exp)
            }
        } else {
            if (isElement) {
                props[exp] = val
            } else {
                domProps[exp] = val
            }
        }
    })

    return new VNode(el.tagName.toLowerCase(), {
        props: props,
        events: events,
        domProps: domProps
    }, compileChildren(el.childNodes, component))
}

const compileChildren = (children: any, component: SimpleNativeComponent): Array<VNode> => {
    let vnodeChildren: Array<VNode> = []
    children.forEach((child: any) => {
        if (child) {
            vnodeChildren.push(compile(child, component))
        }
    })

    return vnodeChildren
}

const isCustomComponent = (tagName: string, componentsMap: any): boolean => {
    return tagName.toLowerCase() in componentsMap
}
