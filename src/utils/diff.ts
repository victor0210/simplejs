import VNode from "../core/VNode";
import Patch from "../core/Patch";
import {max} from "./mathUtils";
import diffType from "../statics/diffType";
import {addPatch} from "./patchUtils";
import {diffInProps, diffInTag, diffInText} from "./diffUtils";

const diff = (oldVNode: VNode, newVNode: VNode): Array<Patch> => {
    let patches: any = {}

    addPatch(patches, diffCore(oldVNode, newVNode, null, true))

    runDiffChildren(oldVNode, newVNode, patches.sub)

    return patches
}

const runDiffChildren = (oldVNode: any, newVNode: any, patches: Array<any>) => {
    let levelLen = max(oldVNode.children.length, newVNode.children.length)

    for (let i = 0; i < levelLen; i++) {
        if (!patches[i]) patches[i] = {}
        addPatch(patches[i], diffCore(oldVNode.children[i], newVNode.children[i], oldVNode.orDom))

        if (oldVNode.children[i] && newVNode.children[i]) {
            runDiffChildren(oldVNode.children[i], newVNode.children[i], patches[i].sub)
        }
    }
}

const diffCore = (oldVNode: any, newVNode: any, parent: any = null, isRoot: boolean = false) => {
    if (!newVNode) {
        return new Patch(diffType.REMOVE, null)
    } else if (!oldVNode && newVNode) {
        return new Patch(diffType.INSERT, newVNode)
    } else if (diffInTag(oldVNode, newVNode)) {
        return new Patch(diffType.REPLACE, newVNode)
    } else if (diffInProps(oldVNode, newVNode)) {
        return new Patch(diffType.PROPS, newVNode.props)
    } else if (diffInText(oldVNode, newVNode)) {
        return new Patch(diffType.TEXT, newVNode.tagName)
    }
}

export default diff