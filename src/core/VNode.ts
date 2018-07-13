import matchType from "../utils/matchType";
import baseType from "../statics/baseType";
import any = jasmine.any;

export default class VNode {
    public tagName: string
    public props: any
    public children: Array<string | VNode>
    public orDom: any
    public parent: any
    public isText: boolean

    constructor(tagName: string, props: any, children: Array<any>, isText: boolean = false) {
        this.tagName = tagName
        this.props = props
        this.children = children
        this.isText = isText

        !this.isText && this.convertTextToTextVNode(this.children)
    }

    convertTextToTextVNode(children: Array<any>) {
        children.forEach((child: any, idx: number) => {
            if (matchType(child, baseType.String)) {
                this.children[idx] = new VNode(child, {}, [], true)
            }

            if (child.children) {
                this.convertTextToTextVNode(child.children)
            }
        })
    }

    render() {
        let root: any = document.createDocumentFragment()

        //render vnode to dom
        let node: any = this.isText ? document.createTextNode(this.tagName) : document.createElement(this.tagName)

        //render props
        for (let key in this.props.props) {
            node.setAttribute(key, this.props.props[key])
        }

        root.appendChild(node)

        if (this.children) this.renderChildren(node)

        this.orDom = node
        this.parent = node.parentNode

        return root
    }

    renderChildren(parent: any) {
        this.children.forEach((child: any) => {
            parent.appendChild(child.render())
        })
    }
}