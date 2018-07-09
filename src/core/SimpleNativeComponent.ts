import ComponentDictionary from "./ComponentDictionary";
import ifKeysAllBelongValidator from "../validators/ifKeysAllBelongValidator";
import initSpecComparisonObject from "../validators/comparisons/initSpecComparisonObject";
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
 *
 * @param context: user spec during the whole component lifeCycle
 * @param this.state / this.props / this.someMethod
 * */
export default class SimpleNativeComponent {
    readonly _uid: number = ++componentUID
    private _watcherHub: WatcherHub = new WatcherHub()
    private _lifeCycle: string = null
    private _pendingState: any = {}

    public context: any = {}
    public state: any = {}

    // blow could be injected
    public props: any = {}
    public events: any = {}

    public injections: any = {
        props: {},
        events: {}
    }

    public injectionComponents: any = {}
    public markup: any

    constructor(spec: any) {
        ifKeysAllBelongValidator(spec, initSpecComparisonObject)

        ComponentDictionary.registerComponent(this)

        this.mergeFromSpec(spec)
        this.setLifeCycle(lifeCycle.CREATED)
    }

    public injectProps(props: any) {
        console.log('inject props', props)
        this.injections.prop = props
    }

    public injectEvents(events: any) {
        console.log('inject events', events)
        this.injections.events = events
    }

    private _inject() {
        this.props = this.injections.props
        this.events = this.injections.events
    }

    public mountComponent(): void {
        this.setLifeCycle(lifeCycle.BEFORE_MOUNT)

        this._inject()
        this.renderComponent()

        this.setLifeCycle(lifeCycle.MOUNTED)
    }

    public updateComponent(): void {
        this.setLifeCycle(lifeCycle.BEFORE_UPDATE)

        this._watcherHub.notify()

        this.setLifeCycle(lifeCycle.UPDATED)
    }

    public unmountComponent(): void {
        ComponentDictionary.cancelComponent(this)
    }

    public pushWatcher(watcher: Watcher) {
        this._watcherHub.addWatcher(watcher)
    }

    public setState(state: object): void {
        if (merge(this._pendingState, state)) {
            merge(this.state, state)
            this.updateComponent()
        }
    }

    private setLifeCycle(lifeCycle: string) {
        this._lifeCycle = lifeCycle
        this.runLifeCycleHook()
    }

    private mergeFromSpec(spec: any) {
        merge(this.context, spec)
        merge(this.state, spec.state)
        merge(this._pendingState, spec.state)
        merge(this.injectionComponents, spec.components)
    }

    private runLifeCycleHook() {
        let lifeCycleHook = this.context[this._lifeCycle]
        if (lifeCycleHook && matchType(lifeCycleHook, baseType.Function)) {
            lifeCycleHook.call(this)
        }
    }

    renderComponent() {
        throwIf(!this.context.render,
            'not found "render" function when init a component'
        )

        setCurrentContext(this)
        this.markup = this.context.render.call(this, createComponent)
        // mountInto(this.state.el, this.markup.innerHTML)
    }
}