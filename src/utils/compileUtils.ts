import {COMPILE_REG} from "../statics/regexp";
import {extractFunction, extractVariable} from "./compileRockers";
import {isClass, isDirective, isEvent, isProps, isReactiveIDentifier, isStyle} from "./attributeUtils";
import SimpleNativeComponent from "../core/SimpleNativeComponent";
import {transToDom} from "./domTransfer";
import {ElementNodeType, TextNodeType} from "../statics/nodeType";
import equal from "./equal";
import VNode from "../core/VNode";
import createVNode from "./createVNode";
import {isTempArray, isTempObject, isTempString} from "./tempMatcher";
import convertStringToJson from "./converStringToJson";
import throwIf from "../loggers/throwIf";

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

    return createVNode(
        textContent,
        {},
        [],
        true,
        false
    )
}

/**
 * @description: compile native element's directive && events bind
 * */

export const compileElement = (el: any, component: SimpleNativeComponent): VNode => {
    return createVNode(
        el.tagName.toLowerCase(),
        compileInline(el, component, true),
        compileChildren(el.childNodes, component)
    )
}

/**
 * @description: compile custom components with directive && events && props
 * */
export const compileCustomComponent = (customEl: any, component: SimpleNativeComponent): VNode => {
    let tagName = customEl.tagName.toLowerCase()
    let props = compileInline(customEl, component)
    return createVNode(
        component.$context.components[tagName],
        props,
        [],
        false,
        true
    )
}

/**
 * @description: directive / event / props compile util
 * */
const compileInline = (el: any, component: SimpleNativeComponent, isElement: boolean = false): object => {
    let props: any = {};
    let styles: any = {}
    let domProps: any = {};
    let classes: any = [];
    let directives: any = {};
    let events: Array<any> = [];

    Array.from(el.attributes).forEach((attr: any) => {
        let exp = attr.name
        let val = attr.value

        let attributeIDentifier = exp[0]
        if (isReactiveIDentifier(attributeIDentifier)) {
            let key = exp.split(attributeIDentifier)[1]
            if (isProps(exp)) {
                if (isStyle(exp) && isElement) {
                    styles = compileStyles(val, component)
                } else if (isClass(exp) && isElement) {
                    classes = compileClasses(val, component)
                } else if (isElement) {
                    domProps[key] = extractVariable(val, component.$vm)
                } else {
                    props[key] = extractVariable(val, component.$vm)
                }
            } else if (isEvent(exp)) {
                events[key] = extractFunction(val, component)
            } else if (isDirective(exp)) {
                directives[key] = extractVariable(val, component.$vm)
            }
        } else {
            if (isElement) {
                domProps[exp] = val
            } else {
                props[exp] = val
            }
        }
    })

    return {
        props: props,
        events: events,
        domProps: domProps,
        classes: classes,
        styles: styles,
        directives: directives
    }
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

const compileStyles = (stylesString: any, component: SimpleNativeComponent): any => {
    throwIf(
        !isTempObject(stylesString),
        'style input must be object!'
    )

    let styles: any = {}
    let comps = stylesString.trim().slice(1, -1).split(',')

    comps.forEach((comp: any) => {
        let kv = comp.split(':')
        let key = kv[0].trim()
        let val = kv[1].trim()

        styles[key] = isTempString(val) ? val.trim().slice(1, -1) : extractVariable(val, component.$vm)
    })

    return styles
}

const compileClasses = (classesString: any, component: SimpleNativeComponent): any => {
    let classes: Array<any> = []

    if (isTempArray(classesString)) {
        classesString.trim().slice(1, -1).split(',').forEach((className: string) => {
            classes.push(extractVariable(className, component.$vm))
        })
    } else {
        classes.push(extractVariable(classesString, component.$vm))
    }

    return classes
}

const isCustomComponent = (tagName: string, componentsMap: any): boolean => {
    return tagName.toLowerCase() in componentsMap
}
