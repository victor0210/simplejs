import {transToFragment} from "../utils/domTransfer";
import {compileCustomComponent, compileElement, compileText} from "../utils/compileUtils";
import equal from "../utils/equal";
import {getCurrentContext} from "./RenderCurrent";
import {ElementNodeType, TextNodeType} from "../statics/nodeType";

export default class Compiler {
    private dangerousHTML: string
    public fragment: DocumentFragment
    public el: any
    public current: any = getCurrentContext()

    constructor(dangerousHTML: string) {
        this.setDangerousHTML(dangerousHTML)
        this.fragment = transToFragment(this.dangerousHTML)
        this.compile(this.fragment)
    }

    private compile(rootFragment: any) {
        rootFragment.childNodes.forEach((child: any) => {
            if (equal(child.nodeType, ElementNodeType)) {
                if (isCustomComponent(child.tagName, this.current)) {
                    compileCustomComponent(child, this.current)
                } else {
                    compileElement(child, this.current)
                }
            } else if (equal(child.nodeType, TextNodeType)) {
                compileText(child, this.current)
            }

            if (child.childNodes) this.compile(child)
        })
    }

    private compileChildren() {
    }

    private setDangerousHTML(dangerousHTML: string) {
        this.dangerousHTML = dangerousHTML
    }
}

const isCustomComponent = (tagName: string, current: any): boolean => {
    return tagName.toLowerCase() in current.$injections.components
}