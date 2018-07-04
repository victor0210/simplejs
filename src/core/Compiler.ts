import transToFragment from "../utils/domTransfer";
import nodeType from "../statics/nodeType";
import {compileElement, compileText} from "../utils/compileUtils";
import equal from "../utils/equal";
import {setCurrentContext} from "./RenderCurrent";

export default class Compiler {
    private dangerousHTML: string
    public fragment: DocumentFragment
    public contextVM: any

    constructor(dangerousHTML: string, contextVM: any) {
        this.contextVM = contextVM
        setCurrentContext(null)

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
                compileText(child, this.contextVM)
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