import Directive from "./Directive";
import SimpleNativeComponent from "./SimpleNativeComponent";

const GlobalInjection: any = {
    directives: {},
    components: {},
    mixins: {}
}

const GlobalInjectionUtil = {
    get() {
        return GlobalInjection
    },
    setDirective(key: string, directive: Directive) {
        GlobalInjection.directives[key] = directive
    },

    getDirective(key: string): any {
        return GlobalInjection.directives[key]
    },

    setComponent(key: string, component: SimpleNativeComponent) {
        GlobalInjection.components[key] = component
    },

    getComponent(key: string): any {
        return GlobalInjection.components[key]
    },

    mixin(mixin: object) {
        Object.assign(GlobalInjection.mixins, mixin)
    }
}

export default GlobalInjectionUtil