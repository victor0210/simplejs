import SimpleNativeComponent from "./SimpleNativeComponent";
import GlobalInjectionUtil from "./GlobalInjection";

const GlobalComponents = {
    set(key: string, component: SimpleNativeComponent) {
        GlobalInjectionUtil.setComponent(key, component)
    },

    get(key: string = undefined): any {
        return GlobalInjectionUtil.getComponent(key)
    }
}

export default GlobalComponents