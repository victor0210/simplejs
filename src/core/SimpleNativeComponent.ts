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
import SimpleComponent from "./SimpleComponent";

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
export default class SimpleNativeComponent extends SimpleComponent {
    readonly _uid: number = ++componentUID

    private _watcherHub: WatcherHub = new WatcherHub()
    private _pendingState: any = {}

    public $el: any
    public $vm: any

    // only state could be mutated
    public state: any = {}

    constructor(spec: any) {
        super(spec);

        /**
         * inject self injections / component && mixins
         * */
        this.injectCurrent()

        this._initVM()
        this._initState()

        this.setLifeCycle(lifeCycle.CREATED)
    }

    private injectCurrent(): void {
        merge(this.$injections.mixins, Object.assign({},
            this.$context.mixins,
            this.$context.state,
            this.$context.methods,
        ))

        merge(this.$injections.components, this.$context.components)
    }

    private _initVM() {
        this.$vm = Object.assign({}, this.$injections.mixins)
    }

    private _initState() {
        this.state = Object.assign({}, this.$context.state)

        // _pendingState is an old state for setState compare
        this._pendingState = Object.assign({}, this.$context.state)
    }

    public mountComponent(): void {
        this.setLifeCycle(lifeCycle.BEFORE_MOUNT)

        this.renderComponent()

        this.setLifeCycle(lifeCycle.MOUNTED)
    }

    public updateComponent(): void {
        this.setLifeCycle(lifeCycle.BEFORE_UPDATE)

        this._watcherHub.notify()

        this.setLifeCycle(lifeCycle.UPDATED)
    }
    //
    // public unmountComponent(): void {
    //     ComponentDictionary.cancelComponent(this)
    // }
    //
    public pushWatcher(watcher: Watcher) {
        this._watcherHub.addWatcher(watcher)
    }

    /**
     * state change emit vm change
     * */
    public setState(state: object): void {
        if (merge(this._pendingState, state)) {
            merge(this.state, state)
            merge(this.$vm, state)
            this.updateComponent()
        }
    }

    private renderComponent() {
        throwIf(!this.$context.render,
            'not found "render" function when init a component'
        )

        setCurrentContext(this)
        this.$el = this.$context.render.call(this, createComponent)
    }
}