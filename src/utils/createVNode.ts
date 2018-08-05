import VNode from "../core/VNode";
import SimpleNativeComponent from "../core/SimpleNativeComponent";
import {getCurrentContext} from "../core/RenderCurrent";
import baseType from "../statics/baseType";
import {instanceOf} from "./instanceOf";
import matchType from "./matchType";
import ComponentProxy from "../core/ComponentProxy";
import directiveLifeCycle from "../statics/directievLifeCycle";
import TextVNode from "../core/TextVNode";
import ComponentVNode from "../core/ComponentVNode";

const createVNode = (tagName: any,
                     props: any,
                     children: Array<string | VNode>,
                     isText: boolean = false,
                     isComponent: boolean = false): VNode => {
    let _vnode = new VNode(
        tagName,
        props || {},
        children || [],
        isText,
        isComponent,
        getCurrentContext()
    )

    _vnode.compileDirective(directiveLifeCycle.BIND)

    convertChildren(_vnode, _vnode.children, _vnode.componentInstance)

    return _vnode
}

const convert2VNode = (param: any, componentInstance: SimpleNativeComponent): VNode => {
    let vnode = param

    if (!vnode) return

    if (matchType(param, baseType.Function)) {
        vnode = convert2VNode(
            param.call(componentInstance.$vm),
            componentInstance
        ) || new TextVNode('', componentInstance)
    } else if (matchType(param, baseType.String) || matchType(param, baseType.Number)) {
        vnode = new TextVNode(
            param,
            componentInstance
        )
    } else if (instanceOf(param, ComponentProxy)) {
        let component = param.fuck()
        vnode = new ComponentVNode(
            component,
            {},
            [],
            componentInstance
        )
    } else if (instanceOf(param.tagName, ComponentProxy)) {
        vnode = new ComponentVNode(
            vnode.tagName.fuck(),
            vnode.props,
            vnode.children,
            componentInstance
        )
    }

    vnode.compileDirective(directiveLifeCycle.BIND)

    return vnode
}

const convertChildren = (parent: VNode, children: Array<any>, componentInstance: SimpleNativeComponent): Array<VNode> => {
    children.forEach((child: any, idx: number) => {
        let _vnode = convert2VNode(child, componentInstance)

        _vnode.injectParentVNode(parent)

        if (_vnode)
            children[idx] = _vnode

        if (child.children)
            convertChildren(child, child.children, componentInstance)
    })
}

export default createVNode