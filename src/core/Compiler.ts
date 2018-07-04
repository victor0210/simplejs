import transToFragment from "../utils/domTransfer";
import nodeType from "../statics/nodeType";
import {compileElement, compileText} from "../utils/compileUtils";
import equal from "../utils/equal";
import {getCurrentContext} from "./RenderCurrent";

export default class Compiler {
    private dangerousHTML: string
    public fragment: DocumentFragment
    public current: any

    constructor(dangerousHTML: string) {
        this.current = getCurrentContext()

        this.setDangerousHTML(dangerousHTML)
        this.fragment = transToFragment(this.dangerousHTML)
        this.compile(this.fragment)

        //test append
        document.getElementById('app').appendChild(this.fragment)
    }

    private compile(rootFragment: any) {
        rootFragment.childNodes.forEach((child: any) => {
            if (equal(child.nodeType, nodeType.ElementNode)) {
                compileElement(child)
            } else if (equal(child.nodeType, nodeType.TextNode)) {
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