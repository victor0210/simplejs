/**
 * @param {type}: mark where diff and do patch with point methods
 * @param {patch}: new dom / new text / new props / null
 * @param {node}: dom who helps do patch currently
 * */
import VNode from "./VNode";

export default class Patch {
    public type: string
    public oldVNode: VNode
    public newVNode: VNode

    constructor(type: string, oldVNode: VNode, newVNode: VNode) {
        this.type = type
        this.oldVNode = oldVNode
        this.newVNode = newVNode
    }
}