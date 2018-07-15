import diffType from "../statics/diffType";

/**
 * @param {type}: mark where diff and do patch with point methods
 * @param {patch}: new dom / new text / new props / null
 * @param {node}: dom who helps do patch currently
 * */
export default class Patch {
    public type: string
    public patch: any
    public node: any

    private isRoot: boolean

    constructor(type: string, patch: any, node: any, isRoot: boolean = false) {
        this.type = type
        this.patch = patch
        this.node = node
        this.isRoot = isRoot
    }

    public doPatch() {
        let replacedNewEl
        switch (this.type) {
            case diffType.REMOVE:
                this.node.remove()
                break
            case diffType.INSERT:
                this.node.appendChild(this.patch.render().firstChild)
                break
            case diffType.REPLACE:
                replacedNewEl = this.patch.render().firstChild
                this.node.replaceWith(replacedNewEl)
                break
            case diffType.PROPS:
                for (let key in this.patch.props) {
                    this.node.setAttribute(key, this.patch.props[key])
                }
                break
            case diffType.TEXT:
                this.node.textContent = this.patch
                break
            default:
                break
        }

        if (this.isRoot && replacedNewEl) {
            return replacedNewEl
        }
    }
}