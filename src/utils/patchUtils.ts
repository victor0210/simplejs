import Patch from "../core/Patch";
import diffType from "../statics/diffType";
import {setAttrs} from "./domTransfer";
import {instanceOf} from "./instanceOf";
import SimpleNativeComponent from "../core/SimpleNativeComponent";

export const addPatch = (patches: any, patch: Patch = undefined) => {
    patches.patch = patch
    patches.sub = []
}

export const applyPatches = (patches: any, rootNode: any): any => {
    let npe

    if (patches.patch) {
        npe = applyPatch(patches.patch, rootNode, true)
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

const applyPatch = (patch: Patch, node: any, isRoot: boolean = false) => {
    if (!patch) return

    let newReplaceEl

    switch (patch.type) {
        case diffType.REMOVE:
            node.remove()
            break
        case diffType.INSERT:
            node.parentNode.appendChild(patch.patch.render())
            break
        case diffType.REPLACE:
            let npe = patch.patch.render()
            node.replaceWith(npe)
            if (isRoot) newReplaceEl = npe
            break
        case diffType.PROPS:
            //update dom props
            setAttrs(node, patch.patch.domProps)

            //inject child component props
            instanceOf(patch.source, SimpleNativeComponent) && patch.source.injectProps(patch.patch.props)
            break
        case diffType.TEXT:
            node.textContent = patch.patch
            break
        default:
            break
    }

    return newReplaceEl
}