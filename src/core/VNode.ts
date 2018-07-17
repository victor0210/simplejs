import matchType from "../utils/matchType";
import baseType from "../statics/baseType";
import {bindEvent} from "../utils/eventUtils";
import {getCurrentContext} from "./RenderCurrent";
import SimpleNativeComponent from "./SimpleNativeComponent";

export default class VNode {
    public tagName: any
    public props: any
    public children: Array<string | VNode>
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

        return root
    }

    private _renderChildren(parent: any) {
        this.children.forEach((child: any, idx: number) => {
            parent.appendChild(child.render())
        })
    }

    private _convertToTextVNode(children: Array<any>) {
        children.forEach((child: any, idx: number) => {
            if (matchType(child, baseType.Function)) {
                child = child.call(getCurrentContext())
                if (
                    !(child instanceof SimpleNativeComponent) ||
                    !(child.tagName instanceof SimpleNativeComponent)
                ) {
                    children[idx] = child
                    return
                }
            }

            if (matchType(child, baseType.String)) {
                children[idx] = new VNode(child, {}, [], true)
            }

            if (child instanceof SimpleNativeComponent) {
                children[idx] = new VNode(child, {}, [])
            }

            if (child.tagName instanceof SimpleNativeComponent) {
                child.tagName.injectProps(child.props.props)
                children[idx] = child
            }

            if (child.children) {
                this._convertToTextVNode(child.children)
            }


        })
    }
}