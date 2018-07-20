/**
 * @param {type}: mark where diff and do patch with point methods
 * @param {patch}: new dom / new text / new props / null
 * @param {node}: dom who helps do patch currently
 * */
export default class Patch {
    public type: string
    public patch: any
    public source: any

    constructor(type: string, patch: any, source: any = null) {
        this.type = type
        this.patch = patch
        this.source = source
    }
}