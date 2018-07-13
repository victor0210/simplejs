import Patch from "../core/Patch";

export const addPatch = (patches: Array<any>, patch: Patch) => {
    if (patch) patches.push(patch)
}

export const applyPatch = (patches: Array<any>): any => {
    let replaceNewEl = null

    patches.forEach(function (patch: Patch) {
        let newEl = patch.doPatch()
        if (newEl) {
            replaceNewEl = newEl
        }
    })

    return replaceNewEl
}