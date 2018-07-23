import VNode from "../core/VNode";
import equal from "./equal";
import {instanceOf} from "./instanceOf";
import SimpleNativeComponentCreator from "../core/SimpleNativeComponentCreator";
import SimpleNativeComponent from "../core/SimpleNativeComponent";

export const diffInTag = (oldVNode: VNode, newVNode: VNode) => {
    if (oldVNode
        && newVNode
        && (!oldVNode.isText || !newVNode.isText)
    ) {
        if (
            instanceOf(oldVNode.tagName, SimpleNativeComponent)
            && instanceOf(newVNode.tagName, SimpleNativeComponent)
        ) {
            //clone old component instance
            newVNode.tagName = oldVNode.tagName
            return !equal(newVNode.tagName._hash, oldVNode.tagName._hash)
        }
        return !equal(newVNode.tagName, oldVNode.tagName)
    }
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