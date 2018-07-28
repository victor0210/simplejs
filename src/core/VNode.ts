import {bindEvent} from "../utils/eventUtils";
import {getCurrentContext} from "./RenderCurrent";
import SimpleNativeComponent from "./SimpleNativeComponent";

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
    }

    public render() {
        this.node = this._createNode()

        this._injectProps()

        if (this.children) this._renderChildren()

        return this.node
    }

    private _renderChildren() {
        this.children.forEach((child: any) => {
            this.node.appendChild(child.render())
        })
    }

    private _createNode() {
        if (this.isComponent) {
            let component = this.tagName
            component.injectProps(this.props.props)
            component.mountComponent(parent)
            return component.$el
        }
        return this.isText ? document.createTextNode(this.tagName) : document.createElement(this.tagName)
    }

    private _injectProps() {
        this._injectDomProps()
        this._injectEvents()
        this._injectDirective()
    }

    private _injectDomProps() {
        for (let key in this.props.domProps) {
            this.node.setAttribute(key, this.props.domProps[key])
        }
    }

    private _injectEvents() {
        for (let key in this.props.events) {
            bindEvent(this.node, key, this.props.events[key].bind(getCurrentContext()))
        }
    }

    private _injectDirective() {

    }
}