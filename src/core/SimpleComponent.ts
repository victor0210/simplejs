import Simple from "./Simple";
import initSpecComparisonObject from "../validators/comparisons/initSpecComparisonObject";
import ifKeysAllBelongValidator from "../validators/ifKeysAllBelongValidator";
import matchType from "../utils/matchType";
import baseType from "../statics/baseType";
import lifeCycle from "../statics/lifeCycle";
import merge from "../utils/merge";
import GlobalMixins from "./GlobalMixins";
import GlobalComponents from "./GlobalComponents";

/**
 * @description: do initialize => $injections, $context, state
 * */
export default class SimpleComponent {
    // global injections
    public $injections: any = {
        components: {},
        mixins: {}
    }

    // user options for the whole lifecycle
    public $context: any

    private _lifeCycle: string

    constructor(spec: any) {
        ifKeysAllBelongValidator(spec, initSpecComparisonObject)

        this._initSpec(spec)
        this._inject()

        this.setLifeCycle(lifeCycle.BEFORE_CREATE)
    }

    /**
     * inject global plugins && components before component create
     */
    private _inject(): void {
        let mixins = GlobalMixins.get()
        let components = GlobalComponents.get()

        merge(this.$injections.mixins, Object.assign({},
            mixins.mixins,
            mixins.state,
            mixins.methods,
        ))

        this.$injections.components = components
    }

    private _initSpec(spec: any): void {
        this.$context = Object.assign({}, spec)
    }

    setLifeCycle(lifeCycle: string): void {
        this._lifeCycle = lifeCycle
        this.runLifeCycleHook()
    }

    private runLifeCycleHook(): void {
        if (this._lifeCycle === lifeCycle.UNMOUNT) return

        let lifeCycleHook = this.$context[this._lifeCycle]
        if (lifeCycleHook && matchType(lifeCycleHook, baseType.Function)) {
            lifeCycleHook.call(this)
        }
    }
}