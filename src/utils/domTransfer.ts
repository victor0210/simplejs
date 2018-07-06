import matchType from "./matchType";
import baseType from "../statics/baseType";
import {componentKey} from "../statics/injectionKey";
import SimpleNativeComponent from "../core/SimpleNativeComponent";

const rootTag: string = 'div'

export const transToFragment = (documentString: string): DocumentFragment => {
    let container = document.createElement(rootTag)
    container.innerHTML = documentString

    let fragment = document.createDocumentFragment()
    fragment.appendChild(container.firstChild)

    return fragment
}

export const getDom = (selectorOrEl: any) => {
    return matchType(selectorOrEl, baseType.String)
        ? document.querySelector(selectorOrEl)
        : selectorOrEl
}

export const getDomAttr = (dom: any, key: string) => {
    return dom.attributes[componentKey]
}

export const pushToDom = (dom: any, component: SimpleNativeComponent) => {
    dom.append(component.markup)
}

export const isParentNode = (selectorOrEl: any): boolean => {
    return !matchType(selectorOrEl, baseType.String)
}