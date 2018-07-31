import {getDom} from "../utils/domTransfer";
import ComponentProxy from "./ComponentProxy";

const ComponentRendererMixins: any = {
    /**
     * @description: register root container if there are not registered yet
     * @description: updating with registered container
     *
     * 1. TODO: register (doing)
     * 2. TODO: update
     * */
    mount(selector: any, componentCreator: ComponentProxy): void {
        let rootDom = getDom(selector)

        let component = componentCreator.fuck()
        component.mountComponent(rootDom)
    }
}

export default ComponentRendererMixins