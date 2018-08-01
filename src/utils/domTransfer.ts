import matchType from "./matchType";
import baseType from "../statics/baseType";
import {COMPONENT_KEY} from "../statics/injectionKey";
import throwIf from "../loggers/throwIf";

const rootTag: string = 'div'

export const transToFragment = (documentString: string): DocumentFragment => {
    let fragment = document.createDocumentFragment()
    fragment.appendChild(transToDom(documentString))

    return fragment
}

export const transToDom = (documentString: string): any => {
    let container = document.createElement(rootTag)
    container.innerHTML = documentString.trim()

    return container.firstChild
}

export const getDom = (selectorOrEl: any) => {
    return matchType(selectorOrEl, baseType.String)
        ? document.querySelector(selectorOrEl)
        : selectorOrEl
}

export const getDomAttr = (dom: any, key: string) => {
    return dom.attributes[COMPONENT_KEY]
}

export const pushToDom = (dom: any, el: any) => {
    if (el) dom.append(el)
}

export const replaceChild = (parent: any, newDom: any, oldDom: any) => {
    parent.replaceChild(newDom, oldDom)
}

export const isParentNode = (selectorOrEl: any): boolean => {
    return !matchType(selectorOrEl, baseType.String)
}

export const removeAttr = (el: any, attr: string) => {
    el.removeAttribute(attr)
}

export const setAttrs = (el: any, attrs: any) => {
    for (let key in attrs) {
        el.setAttribute(key, attrs[key])
    }
}

export const setClasses = (el: any, classes: any) => {
    let classContainer = ''
    if (Array.isArray(classes)) {
        classes.forEach((className: string, index: number) => {
            classContainer = ` ${classContainer} ${className} `.trim()
        })
    } else {
        classContainer = classes
    }

    setClass(el, classContainer)
}

export const setClass = (el: any, className: string) => {
    if (!className) return
    
    if (el.className.indexOf(className) === -1) {
        el.className = `${className.trim()}`.trim()
    }
}

export const setStyles = (el: any, styles: any) => {
    if (!styles) return

    throwIf(!matchType(styles, baseType.Object),
        'styles must be object'
    )

    for(let key in styles) {
        el.style[key] = styles[key]
    }
}