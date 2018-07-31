import Patch from "../core/Patch";
import diffType from "../statics/diffType";
import {removeComponentFromArr} from "./removeFromArr";

export const addPatch = (patches: any, patch: Patch = undefined) => {
    patches.patch = patch
    patches.sub = []
}

/**
 * @description:
 *      1. apply patch to dom
 *      2. apply patch to vnode
 * */
export const applyPatches = (patches: any, rootNode: any): any => {
    let npe

    if (patches.patch) {
        npe = applyPatch(patches.patch, true)
    }

    applyChildren(rootNode, rootNode.childNodes, patches.sub)

    return npe
}

//TODO: children patch
const applyChildren = (parent: any, children: Array<any>, patches: Array<any>) => {
    let childPosOff = 0

    patches.forEach((patch, index) => {
        if (patch.patch) {
            if (patch.patch.type === diffType.INSERT) {
                applyPatch(patch.patch, parent)
            } else {
                applyPatch(patch.patch, children[index + childPosOff])
                if (patch.patch.type === diffType.REMOVE) {
                    childPosOff -= 1
                }
            }
        }

        if (patch.sub && children[index + childPosOff])
            applyChildren(
                children[index + childPosOff],
                children[index + childPosOff].childNodes,
                patch.sub
            )
    })
}

const applyPatch = (patch: Patch, isRoot: boolean = false) => {
    if (!patch) return

    let newReplaceEl
    let {oldVNode, newVNode} = patch

    switch (patch.type) {
        case diffType.REMOVE:
            oldVNode.destroy()

            //apply patch vnode
            oldVNode.parent && removeComponentFromArr(oldVNode.parent.children, oldVNode)
            break
        case diffType.INSERT:
            oldVNode.node.appendChild(newVNode.render())

            //apply patch vnode
            oldVNode.children.push(newVNode)
            break
        case diffType.REPLACE:
            let npe = newVNode.render()
            oldVNode.node.replaceWith(npe)
            if (isRoot) newReplaceEl = npe
            oldVNode.destroy()

            //apply patch vnode
            Object.assign(oldVNode, newVNode)
            break
        case diffType.PROPS:
            //apply patch vnode
            oldVNode.props = newVNode.props

            oldVNode.update()
            oldVNode.isComponent && oldVNode.tagName.injectProps(newVNode.props.props)
            break
        case diffType.TEXT:
            oldVNode.node.textContent = newVNode.tagName

            //apply patch vnode
            oldVNode.tagName = newVNode.tagName
            break
        default:
            break
    }

    return newReplaceEl
}