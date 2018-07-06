import {transToFragment} from "../utils/domTransfer";
import nodeType from "../statics/nodeType";
import {compileCustomComponent, compileElement, compileText} from "../utils/compileUtils";
import equal from "../utils/equal";
import {getCurrentContext} from "./RenderCurrent";
import hasKey from "../utils/hasKey";

export default class Compiler {
    private dangerousHTML: string
    public fragment: DocumentFragment
    public current: any

    constructor(dangerousHTML: string) {
        this.setDangerousHTML(dangerousHTML)
        this.fragment = transToFragment(this.dangerousHTML)
        this.compile(this.fragment)
    }

    private compile(rootFragment: any) {
        rootFragment.childNodes.forEach((child: any) => {
            if (isCustomComponent(child.tagName)) {
                compileCustomComponent(child)
            } else if (equal(child.nodeType, nodeType.ElementNode)) {
                compileElement(child)
            } else if (equal(child.nodeType, nodeType.TextNode)) {
                compileText(child)
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

const isCustomComponent = (tagName: string, current: any = getCurrentContext()): boolean => {
    return tagName in current.injectionComponents
}