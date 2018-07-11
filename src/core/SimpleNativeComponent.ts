import ComponentDictionary, {getComponentByUID} from "./ComponentDictionary";
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
import removeFromArr from "../utils/removeFromArr";
import {bindEvent, unbindEvent} from "../utils/eventUtils";

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
    private _events: any = []

    public $el: any
    public $vm: any
    public $parent: SimpleNativeComponent
    public $children: Array<SimpleNativeComponent> = []

    // only state could be mutated
    public state: any = {}
    public props: any = {}

    constructor(spec: any) {
        super(spec);

        /**
         * inject self injections / component && mixins
         * */
        this.injectCurrent()

        this._initVM()
        this._initState()

        ComponentDictionary.registerComponent(this)

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

        this._renderComponent()

        this._bindEvent()

        this.setLifeCycle(lifeCycle.MOUNTED)
    }

    public updateComponent(): void {
        this.setLifeCycle(lifeCycle.BEFORE_UPDATE)

        this._updateComponent()

        this.setLifeCycle(lifeCycle.UPDATED)
    }

    public unmountComponent(): void {
        this.setLifeCycle(lifeCycle.BEFORE_DESTROY)

        this._teardown()
        this._destroy()

        ComponentDictionary.destroyComponent(this)

        this.setLifeCycle(lifeCycle.DESTROYED)
    }

    public teardownChild(child: SimpleNativeComponent) {
        // this.$children.forEach()
    }

    private _teardown(): void {
        // TODO
        // TODO teardown events listener => done
        // TODO teardown watchers
        // TODO teardown relationship
        // TODO teardown pass data (props)
        //
        // if (this.$parent) {
        //     this.$parent.teardownChild(this)
        // } else {
        //
        // }
        this._unbindEvent()
    }

    private _destroy(): void {
        this.$el.remove()
    }

    public pushWatcher(watcher: Watcher): void {
        this._watcherHub.addWatcher(watcher)
    }

    /**
     * state change emit vm change
     * */
    public setState(state: object): void {
        // console.log(this)
        if (merge(this._pendingState, state)) {
            merge(this.state, state)
            merge(this.$vm, state)
            this.updateComponent()
        }
    }

    public injectPropsAndParent(parent: any, props: object) {
        this.injectParent(parent)
        this.injectProps(props)
    }

    public injectProps(props: object) {
        merge(this.props, props)
        merge(this.$vm, props)
    }

    public injectEvents(events: Array<any>) {
        this._events = [...this._events, ...events]
    }

    private _bindEvent() {
        this._events.forEach((event: any) => {
            let {el, handler, cb} = event
            bindEvent(el, handler, cb)
        })
    }

    private _unbindEvent() {
        this._events.forEach((event: any) => {
            let {el, handler, cb} = event
            unbindEvent(el, handler, cb)
        })

        delete this._events
    }

    public injectParent(parent: SimpleNativeComponent) {
        if (!this.$parent) this.$parent = parent
    }

    public injectChild(child: SimpleNativeComponent) {
        if (this.$children.indexOf(child) === -1) {
            this.$children.push(child)
        }
    }

    private _renderComponent() {
        throwIf(!this.$context.render,
            'not found "render" function when init a component'
        )

        setCurrentContext(this)
        this.$el = this.$context.render.call(this, createComponent).firstChild
    }

    private _updateComponent() {
        this._watcherHub.notify()
    }
}