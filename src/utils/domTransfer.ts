import matchType from "./matchType";
import baseType from "../statics/baseType";
import {COMPONENT_KEY} from "../statics/injectionKey";

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