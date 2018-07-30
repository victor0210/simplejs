import Simple from '../core/Simple'
import VNode from "../core/VNode";

const installText = () => {
    Simple.directive('text', () => {
        let renderText = (el: any, value: any, vnode: VNode) => {
            if (!vnode.isComponent) el.textContent = value
        }
        return {
            bind: (el: any, value: any, vnode: VNode) => {
                if (!vnode.isComponent) vnode.children = []
            },

            insert: (el: any, value: any, vnode: VNode) => {
                renderText(el, value, vnode)
            },

            update: (el: any, value: any, vnode: VNode) => {
                renderText(el, value, vnode)
            }
        }
    })
}

export default installText
