import SimpleComponent from "../implements/SimpleComponent"
import ComponentDictionary from "./ComponentDictionary";
import ifKeysAllBelongValidator from "../validators/ifKeysAllBelongValidator";
import initSpecComparisonObject from "../statics/initSpecComparisonObject";
import lifeCycle from "../statics/lifeCycle";
import baseType from "../statics/baseType";
import throwIf from "../loggers/throwIf";
import createComponent from "../utils/createComponent"
import mountInto from "../utils/mountInto";
import matchType from "../utils/matchType";
import {setCurrentContext} from './RenderCurrent'

/**
 * component uid counter
 * */
let componentUID = 0

/**
 * @description
 * return a component instance
 * component should be mounted manually if there is not has el option
 * */
export default class SimpleNativeComponent extends SimpleComponent {
    readonly _uid: number = ++componentUID
    private _lifeCycle: string = null

    //context for the whole component's lifecycle
    private _context: any
    private _markup: any

    constructor(spec: any) {
        super();

        ifKeysAllBelongValidator(spec, initSpecComparisonObject)

        ComponentDictionary.registerComponent(this)

        this.initContext(spec)
        this.mountComponent()
    }

    public mountComponent(): void {
        this.setLifeCycle(lifeCycle.BEFORE_MOUNT)

        this.renderComponent()

        this.setLifeCycle(lifeCycle.MOUNTED)
    }

    public updateComponent(): void {
    }

    public unmountComponent(): void {
        ComponentDictionary.cancelComponent(this)
    }

    private setLifeCycle(lifeCycle: string) {
        this._lifeCycle = lifeCycle
        this.runLifeCycleHook()
    }

    private initContext(spec: any) {
        this._context = spec
    }

    private runLifeCycleHook() {
        let lifeCycleHook = this._context[this._lifeCycle]
        if (lifeCycleHook && matchType(lifeCycleHook, baseType.Function)) {
            lifeCycleHook.call(this)
        }
    }

    private renderComponent() {
        throwIf(!this._context.render,
            'not found "render" function when init a component'
        )

        setCurrentContext(this._context)
        this._markup = this._context.render.call(this, createComponent)
        mountInto(this._context.el, this._markup.innerHTML)
    }
}