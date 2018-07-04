import SimpleComponent from "../implements/SimpleComponent"
import ComponentDictionary from "./ComponentDictionary";
import ifKeysAllBelongValidator from "../validators/ifKeysAllBelongValidator";
import initSpecComparisonObject from "../statics/initSpecComparisonObject";
import lifeCycle from "../statics/lifeCycle";
import baseType from "../statics/baseType";
import throwIf from "../loggers/throwIf";
import createComponent from "../utils/createComponent"
import matchType from "../utils/matchType";
import {setCurrentContext} from './RenderCurrent'
import merge from "../utils/merge";
import WatcherHub from "./WatcherHub";
import {Watcher} from "./Watcher";

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
    private _markup: any
    private _watcherHub: WatcherHub
    private _pendingState: any = {}

    public context: any = {}
    public state: any = {}

    constructor(spec: any) {
        super();
        ifKeysAllBelongValidator(spec, initSpecComparisonObject)

        ComponentDictionary.registerComponent(this)

        this._watcherHub = new WatcherHub()
        this.initVM(spec)
        this.mountComponent()
    }

    public mountComponent(): void {
        this.setLifeCycle(lifeCycle.BEFORE_MOUNT)

        this.renderComponent()

        this.setLifeCycle(lifeCycle.MOUNTED)
    }

    public updateComponent(): void {
        this._watcherHub.notify()
    }

    public unmountComponent(): void {
        ComponentDictionary.cancelComponent(this)
    }

    public pushWatcher(watcher: Watcher) {
        this._watcherHub.addWatcher(watcher)
    }

    public setState(state: object):void {
        console.log(state, this._pendingState)
        if (merge(this._pendingState, state)) {
            merge(this.state, state)
            this.updateComponent()
        }
    }

    private setLifeCycle(lifeCycle: string) {
        this._lifeCycle = lifeCycle
        this.runLifeCycleHook()
    }

    private initVM(spec: any) {
        merge(this.context, spec)
        merge(this.state, spec.data)
        merge(this._pendingState, spec.data)
    }

    private runLifeCycleHook() {
        let lifeCycleHook = this.context[this._lifeCycle]
        if (lifeCycleHook && matchType(lifeCycleHook, baseType.Function)) {
            lifeCycleHook.call(this)
        }
    }

    private renderComponent() {
        throwIf(!this.context.render,
            'not found "render" function when init a component'
        )

        setCurrentContext(this)
        this._markup = this.context.render.call(this, createComponent)
        // mountInto(this.state.el, this._markup.innerHTML)
    }
}