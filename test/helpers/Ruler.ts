export default class Ruler {
    title: string
    args: Array<any>
    support: any

    constructor (title: string, support: boolean, args: Array<any>) {
        this.title = title
        this.args = args
        this.support = support
    }
}