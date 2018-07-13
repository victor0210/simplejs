import VNode from "../core/VNode";
import Patch from "../core/Patch";
import {max} from "./mathUtils";
import diffType from "../statics/diffType";
import {addPatch} from "./patchUtils";
import {diffInProps, diffInTag, diffInText} from "./diffUtils";

const diff = (oldVNode: VNode, newVNode: VNode): Array<Patch> => {
    let patches: Array<any> = []

    addPatch(patches, diffCore(oldVNode, newVNode))

    runDiffChildren(oldVNode, newVNode, patches)

    return patches
}

const runDiffChildren = (oldVNode: any, newVNode: any, patches: Array<any>) => {
    let levelLen = max(oldVNode.children.length, newVNode.children.length)

    for (let i = 0; i < levelLen; i++) {
        addPatch(patches, diffCore(oldVNode.children[i], newVNode.children[i], oldVNode.orDom))

        if (oldVNode.children[i] && newVNode.children[i]) {
            runDiffChildren(oldVNode.children[i], newVNode.children[i], patches)
        }
    }
}

const diffCore = (oldVNode: any, newVNode: any, parent: any = null) => {
    if (!newVNode) {
        return new Patch(diffType.REMOVE, null, oldVNode.orDom)
    } else if (!oldVNode && newVNode) {
        return new Patch(diffType.INSERT, newVNode, parent)
    } else if (diffInTag(oldVNode, newVNode)) {
        return new Patch(diffType.REPLACE, newVNode, oldVNode.orDom, true)
    } else if (diffInProps(oldVNode, newVNode)) {
        return new Patch(diffType.PROPS, newVNode.props, oldVNode.orDom)
    } else if (diffInText(oldVNode, newVNode)) {
        return new Patch(diffType.TEXT, newVNode.tagName, oldVNode.orDom)
    }
}

export default diff