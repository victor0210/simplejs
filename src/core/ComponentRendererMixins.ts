import SimpleNativeComponent from "./SimpleNativeComponent";
import ContainerDictionary from "./ContainerDictionary";
import matchType from "../utils/matchType";
import baseType from "../statics/baseType";
import {COMPONENT_KEY} from "../statics/injectionKey";
import {getDom, getDomAttr, isParentNode, pushToDom, replaceChild} from "../utils/domTransfer";

const ComponentRendererMixins: any = {
    /**
     * @description: register root container if there are not registered yet
     * @description: updating with registered container
     *
     * 1. TODO: register (doing)
     * 2. TODO: update
     * */
    mount(selector: any, component: SimpleNativeComponent): void {
        let rootDom = getDom(selector)
        let rootKey = getDomAttr(rootDom, COMPONENT_KEY)
        let container

        if (isParentNode(selector)) {
            container = ContainerDictionary.getContainerByRootId(rootKey)
        }

        if (!container) {
            // dom's first mounted
            ContainerDictionary.registerContainer(rootDom)

            component.mountComponent()
            pushToDom(rootDom, component)
        } else {
            // dom's update
        }
    },

    teardown(): void {
    },

    mountChild(node: any, childComponent: SimpleNativeComponent): void {
        childComponent.mountComponent()

        replaceChild(node.parentNode, childComponent.$el, node)
    }
}

export default ComponentRendererMixins