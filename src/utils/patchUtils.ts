import Patch from "../core/Patch";
import diffType from "../statics/diffType";
import {setAttrs} from "./domTransfer";

export const addPatch = (patches: Array<any>, level: number, patch: Patch) => {
    if (!patches[level]) patches[level] = []
    patches[level].push(patch)
}

export const applyPatches = (patches: Array<any>, rootNode: any): any => {
    let level = 0
    let npe

    if (patches[level]) {
        npe = applyPatch(patches[level][0], rootNode, true)
    }

    applyChildren(rootNode.childNodes, patches, 1, 0)

    return npe
}

//TODO: children patch
const applyChildren = (children: Array<any>, patches: Array<any>, level: number, step: number) => {
    // let s = step
    // let prevChildNode: any
    // children.forEach((childNode, index) => {
    //     if (prevChildNode) {
    //         step += prevChildNode.childNodes.length
    //     } else {
    //         step += 0
    //     }
    //
    //     while (patches[level][index + s] && patches[level][index + s].type === diffType.REMOVE) {
    //         applyPatch(patches[level][index + s], childNode)
    //         patches[level].splice(index + s, 1)
    //     }
    //
    //     // while (patches[level][index + step] && (patches[level][index + step].type === diffType.INSERT)) {
    //     //     applyPatch(patches[level][step], childNode.childNodes[0])
    //     //     step++
    //     // }
    //
    //     prevChildNode = childNode
    //
    //     if (childNode.childNodes && childNode.childNodes.length > 0 && patches[level + 1]) {
    //         applyChildren(childNode.childNodes, patches, level + 1, step)
    //     }
    // })

    // let lastChild = children[children.length - 1]
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

            //TODO: update child component props
            break
        case diffType.TEXT:
            node.textContent = patch.patch
            break
        default:
            break
    }

    return newReplaceEl
}