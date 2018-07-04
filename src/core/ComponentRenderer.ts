import SimpleNativeComponent from "./SimpleNativeComponent";

const ComponentRendererMixins: object = {
    /**
     * @description: register root container if there are not registered yet
     * @description: updating with registered container
     *
     * 1. TODO: register (doing)
     * 2. TODO: update
     * */
    bind(selector: string, component: SimpleNativeComponent): void {

    },

    teardown(): void {
    }
}

export default ComponentRendererMixins