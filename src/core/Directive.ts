export default class Directive {
    public key: string
    public cbs: string

    constructor(key: string, cbs: any) {
        this.key = key
        this.cbs = cbs
    }
}