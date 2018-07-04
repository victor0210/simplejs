import SimpleNativeComponent from "./SimpleNativeComponent";
import ContainerDictionary from "./ContainerDictionary";

const ComponentRendererMixins: any = {
    /**
     * @description: register root container if there are not registered yet
     * @description: updating with registered container
     *
     * 1. TODO: register (doing)
     * 2. TODO: update
     * */
    mount(selector: string, component: SimpleNativeComponent): void {
        let container = ContainerDictionary.getContainerByRootId(selector)

        if (!container) {
            let root: any = ContainerDictionary.registerContainer(selector)

            component.mountComponent()

            root.appendChild(component.markup)
            return
        }
    },

    teardown(): void {
    }
}

export default ComponentRendererMixins