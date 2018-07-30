import matchType from "../utils/matchType";
import baseType from "../statics/baseType";
import lifeCycle from "../statics/lifeCycle";
import merge from "../utils/merge";
import GlobalMixins from "./GlobalMixins";
import GlobalComponents from "./GlobalComponents";
import GlobalInjectionUtil from "./GlobalInjection";
import filterLifeCycleHooks from "../utils/filterLifeCycleHooks";

/**
 * @description: do initialize => $injections, $context, state
 * */
export default class SimpleComponent {
    // global injections
    public $injections: any

    // user options for the whole lifecycle
    public $context: any = {
        components: {},
        mixins: {},
        lifeCycleHooks: {},
        renderProxy: null
    }

    public $vm: any

    private _lifeCycle: string

    constructor(spec: any) {
        this._inject()
        this._initLifeCycle(spec)

        this.setLifeCycle(lifeCycle.BEFORE_CREATE)
    }

    private _inject(): void {
        this.$injections = GlobalInjectionUtil.get()
    }

    private _initLifeCycle(spec: any): void {
        Object.assign(this.$context.lifeCycleHooks, filterLifeCycleHooks(spec))
    }

    private runLifeCycleHook(): void {
        if (
            equal(this._lifeCycle, lifeCycle.UNMOUNT)
            || equal(this._lifeCycle, lifeCycle.PENDING)
        ) return

        let lifeCycleHook = this.$context.lifeCycleHooks[this._lifeCycle]
        if (lifeCycleHook && matchType(lifeCycleHook, baseType.Function)) {
            lifeCycleHook.call(this)
        }
    }

    public setLifeCycle(lifeCycle: string): void {
        this._lifeCycle = lifeCycle
        this.runLifeCycleHook()
    }

    public _parseVM(spec: any): object {
        let _vm = {
            methods: {},
            state: {}
        }

        Object.assign(_vm.methods, this.$context.mixins.methods, spec.methods)
        Object.assign(_vm.state, this.$context.mixins.state, spec.state)

        return _vm
    }
}