import lifeCycle from "../statics/lifeCycle";
import throwIf from "../loggers/throwIf";
import {setCurrentContext} from './RenderCurrent'
import merge from "../utils/merge";
import SimpleComponent from "./SimpleComponent";
import createVNode from "../utils/createVNode";
import diff from "../utils/diff";
import {applyPatches} from "../utils/patchUtils";
import VNode from "./VNode";
import {removeComponentFromArr} from "../utils/removeFromArr";
import {pushToDom} from "../utils/domTransfer";
import baseType from "../statics/baseType";
import matchType from "../utils/matchType";
import {compile} from "../utils/compileUtils";

/**
 * @description primary key for mounted component
 * */
let componentUID = 0

/**
 * @description
 * return a component instance
 *
 * @param[_hash]: type tag, same createProxy create same simple
 * */
export default class SimpleNativeComponent extends SimpleComponent {
    private _uid: number
    private _hash: string

    private _pendingState: any = {}

    public $vnode: any
    public $el: any
    public $children: Array<SimpleNativeComponent> = []
    public $parent: SimpleNativeComponent

    // // only state could be mutated
    public state: any = {}
    public props: any = {}

    /**
     * @param[spec]:
     *      el,
     *      mixin,done => context
     *      components,done => context
     *      lifeCycleHooks, => context
     *      template | render => context
     *      state,done => vm
     *      methods,done => vm
     * */
    constructor(spec: any, hash: any) {
        super(spec);

        this._initHash(hash)
        this._initContext(spec)
        this._initVM(spec)

        this.setLifeCycle(lifeCycle.CREATED)
    }

    /**
     * @description[hash]: same when created by same ComponentProxy
     * */
    private _initHash(hash: string): void {
        this._hash = hash
    }

    /**
     * @description: mixin user spec and global injections into $context
     * */
    private _initContext(spec: any): void {
        Object.assign(this.$context.components, this.$injections.components, spec.components)
        Object.assign(this.$context.mixins, this.$injections.mixins, spec.mixins)
        this.$context.renderProxy = spec.template || spec.render
    }

    /**
     * @description: create action scope
     * TODO：merge vm to component instance prototype
     * */
    private _initVM(spec: any): void {
        this.$vm = this._parseVM(spec)
        this.state = this.$vm.state
    }

    private _setVNode(vnode: VNode) {
        this.$vnode = vnode
    }

    private _countUID() {
        this._uid = ++componentUID
    }

    private _createVNode() {
        throwIf(
            !this.$context.renderProxy,
            'not found "render" function or "template" for render'
        )

        setCurrentContext(this)

        if (matchType(this.$context.renderProxy, baseType.Function)) {
            return this.$context.renderProxy.call(this.$vm, createVNode)
        } else {
            return compile.call(this.$vm, this.$context.renderProxy)
        }
    }

    public mountComponent(dom: any): void {
        this._setVNode(
            this._createVNode()
        )

        this.setLifeCycle(lifeCycle.BEFORE_MOUNT)

        this._countUID()
        this._renderComponent()
        this._mountToContainer(dom)
        this._buildRelationshipWithChildren()

        this.setLifeCycle(lifeCycle.MOUNTED)
    }


    public updateComponent(): void {
        this.setLifeCycle(lifeCycle.BEFORE_UPDATE)

        this._updateComponent()

        this.setLifeCycle(lifeCycle.UPDATED)
    }

    private _mountToContainer(dom: any) {
        if (dom) pushToDom(dom, this.$el)
    }

    public _updateChildren(): void {
        this.$children.forEach((child: SimpleNativeComponent) => {
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
            merge(this.$vm.state, state)
            this.updateComponent()
        }
    }

    public injectProps(props: object) {
        this.$vm.props = props
        this.props = props
    }

    public injectParent(parent: SimpleNativeComponent) {
        this.$parent = parent
    }

    public injectChild(child: SimpleNativeComponent) {
        this.$children.push(child)
    }

    /**
     * @transaction: 1. create vnode
     * @transaction: 2. convert vnode to dom
     * @transaction: 3. mount vnode.el to root
     * */
    private _renderComponent() {
        this._bindEl(this.$vnode.render())
    }

    private _bindEl(el: any) {
        if (el) this.$el = el
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
            if (child.isComponent) {
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

        let _vnode = this._createVNode()

        let patches = diff(
            this.$vnode,
            _vnode
        )

        this._bindEl(
            applyPatches(patches, this.$el)
        )

        this._buildRelationshipWithChildren()
        this._updateChildren()
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
        removeComponentFromArr(this.$children, child)
    }
}