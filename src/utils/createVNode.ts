import VNode from "../core/VNode";

const createVNode = (tagName: string, props: any, children: Array<string|VNode>) => {
     return new VNode(tagName, props, children)
}

export default createVNode