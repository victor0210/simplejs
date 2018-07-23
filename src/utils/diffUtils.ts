import VNode from "../core/VNode";
import equal from "./equal";
import {instanceOf} from "./instanceOf";
import SimpleNativeComponentCreator from "../core/SimpleNativeComponentCreator";
import SimpleNativeComponent from "../core/SimpleNativeComponent";

export const diffInTag = (oldVNode: VNode, newVNode: VNode) => {
    if (oldVNode
        && newVNode
        && !oldVNode.isText
        && !newVNode.isText
        && instanceOf(oldVNode.tagName, SimpleNativeComponent)
        && instanceOf(newVNode.tagName, SimpleNativeComponent)
    ) {
        if (equal(newVNode.tagName._hash, oldVNode.tagName._hash)) {
            //clone old component instance
            newVNode.tagName = oldVNode.tagName
            return false
        } else {
            return true
        }
    }

    return !equal(newVNode.tagName, oldVNode.tagName)
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