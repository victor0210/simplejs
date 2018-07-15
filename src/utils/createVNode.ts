import VNode from "../core/VNode";
import SimpleNativeComponent from "../core/SimpleNativeComponent";

const createVNode = (tagName: any, props: any, children: Array<string | VNode>) => {
    return new VNode(tagName, props, children)
}

export default createVNode