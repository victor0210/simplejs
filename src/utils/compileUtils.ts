import {COMPILE_REG} from "../statics/regexp";
import {extractFunction, extractVariable} from "./compileRockers";
import ComponentRendererMixins from "../core/ComponentRendererMixins";
import {isEvent, isProps, isReactiveIDentifier} from "./attributeUtils";
import SimpleNativeComponent from "../core/SimpleNativeComponent";
import {removeAttr, transToDom} from "./domTransfer";
import {ElementNodeType, TextNodeType} from "../statics/nodeType";
import equal from "./equal";
import VNode from "../core/VNode";
import createVNode from "./createVNode";

export const compile2VNode = (template: string) => {
    let dom = transToDom(template)

    return compile(dom)
}

const compile = (dom: any): VNode => {
    let tagName: any
    let isText: boolean
    let isComponent: boolean

    if (dom.nodeType === ElementNodeType) {
        tagName = dom.tagName.toLowerCase()
    } else if (dom.nodeType === TextNodeType) {
        tagName = dom.textContent
        isText = true
    }
    return createVNode(tagName, compileProps(dom), compileChildren(dom.childNodes), isText, isComponent)
}

const compileProps = (dom: any) => {
    let props: any = {
        props: {},
        domProps: {},
        on: {},
        events: {}
    }

    dom.attributes && Array.from(dom.attributes).forEach((attr: any) => {
        props.domProps[attr.name] = attr.value
    })

    return props
}

const compileChildren = (children: any): Array<VNode> => {
    let vnodeChildren: Array<VNode> = []
    children.forEach((child: any) => {
        if (child) {
            vnodeChildren.push(compile(child))
        }
    })

    return vnodeChildren
}

/**
 * -------------------------------------------------------------------------------------- previous
 * */
// export const compileChildren = (node: DocumentFragment, componentInstance: SimpleNativeComponent) => {
//     node.childNodes.forEach((child: any) => {
//         if (equal(child.nodeType, ElementNodeType)) {
//             if (isCustomComponent(child.tagName, componentInstance.$context.components)) {
//                 console.log('compile cus component')
//                 // compileCustomComponent(child, this.current)
//             } else {
//                 console.log('compile element', child)
//                 // compileElement(child, this.current)
//             }
//         } else if (equal(child.nodeType, TextNodeType)) {
//             console.log(compileText(child, componentInstance))
//         }
//
//         if (child.childNodes) compileChildren(child, componentInstance)
//     })
// }
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
    //
    // updater()
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

const isCustomComponent = (tagName: string, componentsMap: any): boolean => {
    console.log(componentsMap, 'componentsMap')
    return tagName.toLowerCase() in componentsMap
}