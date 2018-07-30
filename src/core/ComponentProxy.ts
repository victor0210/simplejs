import SimpleNativeComponent from "./SimpleNativeComponent";
import ifKeysAllBelongValidator from "../validators/ifKeysAllBelongValidator";
import initSpecComparisonObject from "../validators/comparisons/initSpecComparisonObject";
import guid from "../utils/guid";
import {getDom} from "../utils/domTransfer";
import throwIf from "../loggers/throwIf";

/**
 * component proxy
 * */
export default class ComponentProxy {
    private _opts: any
    private _hash: any

    constructor(spec: any) {
        ifKeysAllBelongValidator(spec, initSpecComparisonObject)

        this._opts = spec
        this._hash = guid()

        this._autoMount(spec.el)
    }

    /**
     * @description: component will auto mount if has "el" option
     * */
    private _autoMount(el: any): void {
        if (!el) return

        const _el = getDom(el)
        throwIf(!_el,
            'el option must be an available selector or element'
        )
        this.fuck().mountComponent(_el)
    }

    /**
     * @description: mount manually if without "el" option
     * */
    public $mount(selector: any) {
        let component = new SimpleNativeComponent(this._opts, this._hash)
        let dom = getDom(selector)
        component.mountComponent(dom)
        return component
    }

    /**
     * create component instance for render
     * */
    public fuck() {
        return new SimpleNativeComponent(this._opts, this._hash)
    }
}