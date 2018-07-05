import SimpleNativeComponent from "./SimpleNativeComponent";
import ContainerDictionary from "./ContainerDictionary";
import matchType from "../utils/matchType";
import baseType from "../statics/baseType";
import {componentKey} from "../statics/injectionKey";

const ComponentRendererMixins: any = {
    /**
     * @description: register root container if there are not registered yet
     * @description: updating with registered container
     *
     * 1. TODO: register (doing)
     * 2. TODO: update
     * */
    mount(selector: any, component: SimpleNativeComponent): void {
        let isSelector = matchType(selector, baseType.String)
        let rootDom = isSelector ? document.querySelector(selector) : selector

        let rootKey = rootDom.attributes[componentKey]

        let container = ContainerDictionary.getContainerByRootId(rootKey)

        if (!container) {
            ContainerDictionary.registerContainer(rootDom)

            component.mountComponent()

            rootDom.appendChild(component.markup)
            return
        }
    },

    teardown(): void {
    }
}

export default ComponentRendererMixins