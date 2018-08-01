import {bindEvent} from "../utils/eventUtils";
import {getCurrentContext} from "./RenderCurrent";
import SimpleNativeComponent from "./SimpleNativeComponent";
import directiveLifeCycle from "../statics/directievLifeCycle";
import GlobalDirectives from "./GlobalDirectives";
import matchType from "../utils/matchType";
import baseType from "../statics/baseType";
import {pushToDom, setAttrs, setClasses} from "../utils/domTransfer";

/**
 * @param[props]:
 *      props => only inject into child component
 *      domProps => inject into element
 *      events => bind to native dom
 *      directive => bind to native dom
 *      TODO: on => add custom listener
 * */
export default class VNode {
    public tagName: any
    public props: any
    public children: Array<any>
    public isText: boolean
    public isComponent: boolean
    public componentInstance: SimpleNativeComponent

    public node: any
    public directives: any
    public parent: VNode

    constructor(tagName: any = null,
                props: any = {},
                children: Array<any> = [],
                isText: boolean = false,
                isComponent: boolean = false,
                componentInstance?: SimpleNativeComponent) {
        this.tagName = tagName
        this.props = props
        this.children = children
        this.isText = isText
        this.isComponent = isComponent
        this.componentInstance = componentInstance

        this._injectDirective()
    }

    public render(parent?: any) {
        this.node = this._createNode(parent)

        this._injectProps()

        this.compileDirective(directiveLifeCycle.INSERT)

        if (this.children && !this.isText && !this.isComponent) this._renderChildren()

        return this.node
    }

    public update() {
        this._injectDomClasses()
        this._injectDomProps()
        this._injectDirective()
        this.compileDirective(directiveLifeCycle.UPDATE)
    }

    public destroy() {
        if (this.isComponent) {
            this.tagName.destroy()
        } else {
            this.node.remove()
        }
        this.compileDirective(directiveLifeCycle.UNBIND)
    }

    private _renderChildren() {
        this.children.forEach((child: any) => {
            if (child.isComponent) {
                child.render(this.node)
            } else {
                pushToDom(this.node, child.render())
            }
        })
    }

    private _createNode(parent?: any) {
        if (this.isComponent) {
            let component = this.tagName
            component.injectProps(this.props.props)
            component.mountComponent(parent)
            return component.$el
        }
        return this.isText ? document.createTextNode(this.tagName) : document.createElement(this.tagName)
    }

    public compileDirective(type: string) {
        this.directives && Object.keys(this.directives).forEach((key: string) => {
            let directive = GlobalDirectives.get(key)

            if (directive && directive.cbs) {
                let func = directive.cbs[type]
                if (matchType(func, baseType.Function)) {
                    func(this.node, this.directives[key], this)
                }
            }
        })
    }

    private _injectProps() {
        this._injectDomClasses()
        this._injectDomProps()
        this._injectEvents()
    }

    private _injectDomClasses() {
        if (!this.isText) {
            setClasses(
                this.node,
                this.props.classes
            )
        }
    }

    private _injectDomProps() {
        if (!this.isText) {
            setAttrs(
                this.node,
                this.props.domProps
            )
        }
    }

    private _injectEvents() {
        for (let key in this.props.events) {
            bindEvent(this.node, key, this.props.events[key].bind(getCurrentContext()))
        }
    }

    private _injectDirective() {
        this.directives = this.props.directives
    }
}