import VNode from "../core/VNode";
import equal from "./equal";

export const diffInTag = (oldVNode: VNode, newVNode: VNode) => {
    if (oldVNode && newVNode && !oldVNode.isText && !newVNode.isText) {
        return !equal(oldVNode.tagName, newVNode.tagName)
    }

    return false
}

export const diffInProps = (oldVNode: VNode, newVNode: VNode) => {
    if (oldVNode && newVNode && !oldVNode.isText && !newVNode.isText) {
        return !equal(oldVNode.props, newVNode.props)
    }

    return false
}

export const diffInText = (oldVNode: VNode, newVNode: VNode) => {
    if (oldVNode && newVNode && oldVNode.isText && newVNode.isText) {
        return !equal(oldVNode.tagName, newVNode.tagName)
    }

    return false
}