import VNode from "../core/VNode";
import SimpleNativeComponent from "../core/SimpleNativeComponent";
import {getCurrentContext} from "../core/RenderCurrent";
import baseType from "../statics/baseType";
import {instanceOf} from "./instanceOf";
import matchType from "./matchType";

const createVNode = (tagName: any, props: any = {}, children: Array<string | VNode> = []) => {
    let _vnode = new VNode(
        tagName,
        props,
        children,
        false,
        false,
        getCurrentContext()
    )

    convertChildren(_vnode.children, _vnode.componentInstance)

    return _vnode
}

const convert2VNode = (param: any, componentInstance: SimpleNativeComponent): any => {
    if (instanceOf(param, VNode)) return param

    if (matchType(param, baseType.Function)) {
        return convert2VNode(
            param.call(componentInstance.$vm),
            componentInstance
        )
    } else if (matchType(param, baseType.String)) {
        return new VNode(
            param,
            {},
            [],
            true,
            false,
            componentInstance
        )
    } else if (instanceOf(param, SimpleNativeComponent)) {
        return new VNode(
            SimpleNativeComponent,
            {},
            [],
            false,
            true,
            componentInstance
        )
    }
}

const convertChildren = (children: Array<any>, componentInstance: SimpleNativeComponent): Array<VNode> => {
    children.forEach((child: any, idx: number) => {
        let _vnode = convert2VNode(child, componentInstance)

        if (_vnode)
            children[idx] = _vnode

        if (child.children)
            convertChildren(child.children, componentInstance)
    })
    return
}

export default createVNode