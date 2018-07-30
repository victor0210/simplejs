import VNode from "../core/VNode";
import SimpleNativeComponent from "../core/SimpleNativeComponent";
import {getCurrentContext} from "../core/RenderCurrent";
import baseType from "../statics/baseType";
import {instanceOf} from "./instanceOf";
import matchType from "./matchType";
import ComponentProxy from "../core/ComponentProxy";

const createVNode = (tagName: any, props: any, children: Array<string | VNode>): VNode => {
    let _vnode = new VNode(
        tagName,
        props || {},
        children || [],
        false,
        false,
        getCurrentContext()
    )

    convertChildren(_vnode, _vnode.children, _vnode.componentInstance)

    return _vnode
}

const convert2VNode = (param: any, componentInstance: SimpleNativeComponent): VNode => {
    if (instanceOf(param, VNode)
        && !instanceOf(param.tagName, ComponentProxy)
    ) return param

    if (matchType(param, baseType.Function)) {
        return convert2VNode(
            param.call(componentInstance.$vm),
            componentInstance
        )
    } else if (matchType(param, baseType.String) || matchType(param, baseType.Number)) {
        return new VNode(
            param,
            {},
            [],
            true,
            false,
            componentInstance
        )
    } else if (instanceOf(param, ComponentProxy)) {
        return new VNode(
            param.fuck(),
            {},
            [],
            false,
            true,
            componentInstance
        )
    } else if (instanceOf(param.tagName, ComponentProxy)) {
        param.tagName = param.tagName.fuck()
        param.isComponent = true

        return param
    }
}

const convertChildren = (parent: VNode, children: Array<any>, componentInstance: SimpleNativeComponent): Array<VNode> => {
    children.forEach((child: any, idx: number) => {
        let _vnode = convert2VNode(child, componentInstance)

        _vnode.parent = parent

        if (_vnode)
            children[idx] = _vnode

        if (child.children)
            convertChildren(child, child.children, componentInstance)
    })
    return
}

export default createVNode