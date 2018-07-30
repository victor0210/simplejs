import Simple from '../core/Simple'
import VNode from "../core/VNode";

const installIf = () => {
    Simple.directive('if', () => {
        const hideVNode = (vnode: VNode) => {
            vnode.tagName = ''
            vnode.isText = true
            vnode.isComponent = false
            vnode.children = []
        }

        return {
            bind: (el: any, value: any, vnode: VNode) => {
                if (!value) hideVNode(vnode)
            }
        }
    })
}

export default installIf
