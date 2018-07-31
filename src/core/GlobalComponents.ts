import GlobalInjectionUtil from "./GlobalInjection";
import ComponentProxy from "./ComponentProxy";

const GlobalComponents = {
    set(key: string, component: ComponentProxy) {
        GlobalInjectionUtil.setComponent(key, component)
    },

    get(key: string = undefined): any {
        return GlobalInjectionUtil.getComponent(key)
    }
}

export default GlobalComponents