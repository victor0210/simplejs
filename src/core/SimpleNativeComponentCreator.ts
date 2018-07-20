import SimpleNativeComponent from "./SimpleNativeComponent";
import ifKeysAllBelongValidator from "../validators/ifKeysAllBelongValidator";
import initSpecComparisonObject from "../validators/comparisons/initSpecComparisonObject";
import guid from "../utils/guid";

export default class SimpleNativeComponentCreator {
    private _opts: any
    private _hash: any

    constructor(spec: any) {
        ifKeysAllBelongValidator(spec, initSpecComparisonObject)

        this._opts = spec
        this._hash = guid()
    }

    public fuck() {
        return new SimpleNativeComponent(this._opts, this._hash)
    }
}