import Ruler from "./Ruler";

export default class TestCreator {
    rules: Array<Ruler> = []

    constructor (configs: Array<Ruler>) {
        this.rules = configs
    }
}