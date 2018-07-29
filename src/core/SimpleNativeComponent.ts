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
import {getDom, pushToDom} from "../utils/domTransfer";
import filterLifeCycleHooks from "../utils/filterLifeCycleHooks";
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
 * */
export default class SimpleNativeComponent extends SimpleComponent {
    private _uid: number
    private _hash: string

    // private _watcherHub: WatcherHub = new WatcherHub()
    // private _pendingState: any = {}
    //
    public $vnode: any
    public $el: any
    // public $parent: SimpleNativeComponent
    // public $children: Array<SimpleNativeComponent> = []
    //
    // // only state could be mutated
    // public state: any = {}
    // public props: any = {}

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
            this._setVNode(
                this.$context.renderProxy.call(this.$vm, createVNode)
            )
        } else {
            this._setVNode(
               compile.call(this.$vm, this.$context.renderProxy)
            )
        }
    }

    public mountComponent(dom: any): void {
        console.log(dom,'dsa')
        this._createVNode()

        this.setLifeCycle(lifeCycle.BEFORE_MOUNT)

        this._countUID()
        this._renderComponent()

        this._mountToContainer(dom)

        this.setLifeCycle(lifeCycle.MOUNTED)
    }
    //
    // private _actionDirective() {
    //     this.$vnode.actionDirective()
    // }
    //
    // private _updateDirective() {
    //     this.$vnode.updateDirective()
    // }
    //
    private _mountToContainer(dom: any) {
        if (dom) pushToDom(dom, this)
    }
    //
    // public updateComponent(): void {
    //     this.setLifeCycle(lifeCycle.BEFORE_UPDATE)
    //
    //     this._updateComponent()
    //
    //     this.setLifeCycle(lifeCycle.UPDATED)
    // }
    //
    // //not replace the same component creator but should reinject new props
    // public updateChildren(): void {
    //     this.$children && this.$children.forEach((child: SimpleNativeComponent) => {
    //         child.updateComponent()
    //     })
    // }
    //
    // /**
    //  * 1.self calling destroy
    //  * TODO: vnode replace contains component
    //  * */
    // public destroy(): void {
    //     this.setLifeCycle(lifeCycle.BEFORE_DESTROY)
    //
    //     this._destroy()
    //
    //     this.setLifeCycle(lifeCycle.DESTROYED)
    // }
    //
    // /**
    //  * state change emit vm change
    //  * */
    // public setState(state: object): void {
    //     if (merge(this._pendingState, state)) {
    //         merge(this.state, state)
    //         merge(this.$vm, state)
    //         this.updateComponent()
    //     }
    // }
    //
    // public injectPropsAndParent(parent: any, props: object) {
    //     this.injectParent(parent)
    //     this.injectProps(props)
    // }
    //
    public injectProps(props: object) {
        this.$vm.props = props
    }
    //
    // public injectParent(parent: SimpleNativeComponent) {
    //     this.$parent = parent
    // }
    //
    // public injectChild(child: SimpleNativeComponent) {
    //     this.$children.push(child)
    // }
    //
    //
    // private _bindVNode(vnode: VNode) {
    //     this.$vnode = vnode
    // }
    //

    /**
     * @transaction: 1. create vnode
     * @transaction: 2. convert vnode to dom
     * @transaction: 3. mount vnode.el to root
     * */
    private _renderComponent() {
        this._bindEl(this.$vnode.render())
        // this._actionDirective()
    }

    private _bindEl(el: any) {
        if (el) this.$el = el
    }

    private _loadComponentOptions(vnode: VNode, el: any) {
        // this._bindVNode(vnode)
        // this._bindEl(el)

        // this._buildRelationshipWithChildren()
    }
    //
    // private _buildRelationshipWithChildren() {
    //     this._initChildren()
    //     this._injectChildren()
    //     this._injectParentToChildren()
    // }
    //
    // private _initChildren() {
    //     this.$children = []
    // }
    //
    // private _injectChildren(parent: any = this.$vnode) {
    //     parent.children.forEach((child: VNode) => {
    //         if (instanceOf(child.tagName, SimpleNativeComponent)) {
    //             this.injectChild(child.tagName)
    //         } else {
    //             if (child.children) this._injectChildren(child)
    //         }
    //     })
    // }
    //
    // private _injectParentToChildren() {
    //     this.$children.forEach((child: any) => {
    //         child.injectParent(this)
    //     })
    // }
    //
    // private _updateComponent() {
    //     setCurrentContext(this)
    //
    //     let newVNode = this.$context.render.call(this, createVNode)
    //
    //     let patches = diff(
    //         this.$vnode,
    //         newVNode
    //     )
    //
    //     let npe = applyPatches(patches, this.$el)
    //
    //     if (!newVNode.node){
    //         newVNode.node = this.$vnode.node
    //     }
    //
    //     this._patchChildrenVNodes(newVNode.children, this.$vnode.children)
    //
    //     this.updateChildren()
    //
    //     this._loadComponentOptions(newVNode, npe)
    //
    //     this._updateDirective()
    // }
    //
    // private _patchChildrenVNodes(newVC: Array<VNode>, oldVC: Array<VNode>) {
    //     newVC.forEach((v: VNode, idx: number) =>{
    //         if (!v.node){
    //             v.node = oldVC[idx].node
    //         }
    //     })
    // }
    //
    // private _destroy() {
    //     this._removeFromParent()
    //     this._destroyChildren()
    //
    //     this.$el.remove()
    // }
    //
    // private _destroyChildren() {
    //     while (this.$children.length)
    //         this.$children.pop().destroy()
    // }
    //
    // private _removeFromParent() {
    //     this.$parent && this.$parent._removeChild(this)
    // }
    //
    // private _removeChild(child: SimpleNativeComponent) {
    //     removeFromArr(this.$children, child)
    // }
}