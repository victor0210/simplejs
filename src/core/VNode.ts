import matchType from "../utils/matchType";
import baseType from "../statics/baseType";
import {bindEvent} from "../utils/eventUtils";
import {getCurrentContext} from "./RenderCurrent";
import SimpleNativeComponent from "./SimpleNativeComponent";

export default class VNode {
    public tagName: any
    public props: any
    public children: Array<string | VNode>
    public orDom: any
    public isText: boolean

    constructor(tagName: any, props: any, children: Array<any>, isText: boolean = false) {
        this.tagName = tagName
        this.props = props
        this.children = children
        this.isText = isText

        !this.isText && this._convertToTextVNode(this.children)
    }

    public render() {
        let node: any
        let root: any = document.createDocumentFragment()

        if (this.tagName instanceof SimpleNativeComponent) {
            let component = this.tagName
            component.mountComponent()
            node = component.$el
        } else {
            node = this.isText ? document.createTextNode(this.tagName) : document.createElement(this.tagName)
        }

        //render props
        for (let key in this.props.domProps) {
            node.setAttribute(key, this.props.domProps[key])
        }

        //bind events
        for (let key in this.props.events) {
            bindEvent(node, key, this.props.events[key].bind(getCurrentContext()))
        }

        root.appendChild(node)

        if (this.children) this._renderChildren(node)

        this.orDom = node

        return root
    }

    private _renderChildren(parent: any) {
        this.children.forEach((child: any, idx: number) => {
            if (child instanceof SimpleNativeComponent) {
                child.mountComponent()
                this.children[idx] = child.$el
                parent.appendChild(child.$el)
            } else {
                parent.appendChild(child.render())
            }
        })
    }

    private _convertToTextVNode(children: Array<any>) {
        children.forEach((child: any, idx: number) => {
            if (matchType(child, baseType.String)) {
                this.children[idx] = new VNode(child, {}, [], true)
            }

            if (child instanceof SimpleNativeComponent) {
                this.children[idx] = new VNode(child, {}, [])
            }

            if (child.children) {
                this._convertToTextVNode(child.children)
            }
        })
    }
}