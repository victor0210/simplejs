import VNode from "../core/VNode";
import Patch from "../core/Patch";
import {max} from "./mathUtils";
import diffType from "../statics/diffType";
import {addPatch} from "./patchUtils";
import {diffInProps, diffInTag, diffInText} from "./diffUtils";
import equal from "./equal";

const diff = (oldVNode: VNode, newVNode: VNode): Array<Patch> => {
    let patches: any = {}

    let patch = diffCore(oldVNode, newVNode, null, true)
    addPatch(patches, patch)

    notReplace(patch) && runDiffChildren(oldVNode, newVNode, patches.sub)

    console.log(patches)
    return patches
}

const runDiffChildren = (oldVNode: any, newVNode: any, patches: Array<any>) => {
    let levelLen = max(oldVNode.children.length, newVNode.children.length)

    for (let i = 0; i < levelLen; i++) {
        if (!patches[i]) patches[i] = {}
        let patch = diffCore(oldVNode.children[i], newVNode.children[i], oldVNode.orDom)
        addPatch(patches[i], patch)

        if (oldVNode.children[i] && newVNode.children[i] && notReplace(patch)) {
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

const notReplace = (patch: Patch) => {
    if (!patch) return true

    return !equal(patch.type, diffType.REPLACE)
}

export default diff