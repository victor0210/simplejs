import lifeCycle from "../statics/lifeCycle";
import throwIf from "../loggers/throwIf";
import {setCurrentContext} from './RenderCurrent'
import merge from "../utils/merge";
import SimpleComponent from "./SimpleComponent";
import createVNode from "../utils/createVNode";
import diff from "../utils/diff";
import {applyPatches} from "../utils/patchUtils";
import VNode from "./VNode";
import {instanceOf} from "../utils/instanceOf";
import removeFromArr from "../utils/removeFromArr";

/**
 * @description component uid counter，plus when mounted
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
    public _uid: number

    // private _watcherHub: WatcherHub = new WatcherHub()
    private _pendingState: any = {}

    public $vnode: any
    public $el: any
    public $vm: any
    public $parent: SimpleNativeComponent
    public $children: Array<SimpleNativeComponent> = []

    // only state could be mutated
    public state: any = {}
    public props: any = {}

    constructor(spec: any, creatorHash: any) {
        super(spec, creatorHash);

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

    private _countUID() {
        this._uid = ++componentUID
    }

    public mountComponent(): void {
        this.setLifeCycle(lifeCycle.BEFORE_MOUNT)

        this._countUID()
        this._renderComponent()

        this.setLifeCycle(lifeCycle.MOUNTED)
    }

    public updateComponent(): void {
        this.setLifeCycle(lifeCycle.BEFORE_UPDATE)

        this._updateComponent()

        this.setLifeCycle(lifeCycle.UPDATED)
    }

    //not replace the same component creator but should reinject new props
    public updateChildren(): void {
        this.$children && this.$children.forEach((child: SimpleNativeComponent) => {
            child.updateComponent()
        })
    }

    /**
     * 1.self calling destroy
     * TODO: vnode replace contains component
     * */
    public destroy(): void {
        this.setLifeCycle(lifeCycle.BEFORE_DESTROY)

        this._destroy()

        this.setLifeCycle(lifeCycle.DESTROYED)
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

    public injectPropsAndParent(parent: any, props: object) {
        this.injectParent(parent)
        this.injectProps(props)
    }

    public injectProps(props: object) {
        merge(this.props, props)
        merge(this.$vm, props)
    }

    public injectParent(parent: SimpleNativeComponent) {
        this.$parent = parent
    }

    public injectChild(child: SimpleNativeComponent) {
        this.$children.push(child)
    }

    private _bindEl(el: any) {
        if (el) this.$el = el
    }

    private _bindVNode(vnode: VNode) {
        this.$vnode = vnode
    }

    private _renderComponent() {
        throwIf(!this.$context.render,
            'not found "render" function when init a component'
        )

        setCurrentContext(this)

        const vnode = this.$context.render.call(this, createVNode)

        this._loadComponentOptions(vnode, vnode.render())
    }

    private _loadComponentOptions(vnode: VNode, el: any) {
        this._bindVNode(vnode)
        this._bindEl(el)

        this._buildRelationshipWithChildren()
    }

    private _buildRelationshipWithChildren() {
        this._initChildren()
        this._injectChildren()
        this._injectParentToChildren()
    }

    private _initChildren() {
        this.$children = []
    }

    private _injectChildren(parent: any = this.$vnode) {
        parent.children.forEach((child: VNode) => {
            if (instanceOf(child.tagName, SimpleNativeComponent)) {
                this.injectChild(child.tagName)
            } else {
                if (child.children) this._injectChildren(child)
            }
        })
    }

    private _injectParentToChildren() {
        this.$children.forEach((child: any) => {
            child.injectParent(this)
        })
    }

    private _updateComponent() {
        setCurrentContext(this)

        let newVNode = this.$context.render.call(this, createVNode)

        let patches = diff(
            this.$vnode,
            newVNode
        )

        let npe = applyPatches(patches, this.$el)

        this.updateChildren()

        this._loadComponentOptions(newVNode, npe)
    }

    private _destroy() {
        this._removeFromParent()
        this._destroyChildren()

        this.$el.remove()
    }

    private _destroyChildren() {
        while (this.$children.length)
            this.$children.pop().destroy()
    }

    private _removeFromParent() {
        this.$parent && this.$parent._removeChild(this)
    }

    private _removeChild(child: SimpleNativeComponent) {
        removeFromArr(this.$children, child)
    }
}