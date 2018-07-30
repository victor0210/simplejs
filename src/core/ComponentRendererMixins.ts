import SimpleNativeComponent from "./SimpleNativeComponent";
import ContainerDictionary from "./ContainerDictionary";
import {COMPONENT_KEY} from "../statics/injectionKey";
import {getDom, getDomAttr, isParentNode, pushToDom, replaceChild} from "../utils/domTransfer";
import SimpleNativeComponentCreator from "./SimpleNativeComponentCreator";

const ComponentRendererMixins: any = {
    /**
     * @description: register root container if there are not registered yet
     * @description: updating with registered container
     *
     * 1. TODO: register (doing)
     * 2. TODO: update
     * */
    mount(selector: any, componentCreator: SimpleNativeComponentCreator): void {
        let rootDom = getDom(selector)

        let component = componentCreator.fuck()
        component.mountComponent(rootDom)
    },

    mountChild(node: any, childComponent: SimpleNativeComponent): void {
        childComponent.mountComponent()

        replaceChild(node.parentNode, childComponent.$el, node)
    }
}

export default ComponentRendererMixins