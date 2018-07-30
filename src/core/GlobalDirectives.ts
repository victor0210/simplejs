import Directive from "./Directive";
import GlobalInjectionUtil from "./GlobalInjection";

const GlobalDirectives = {
    set(key: string, directive: Directive) {
        GlobalInjectionUtil.setDirective(key, directive)
    },

    get(key: string): any {
        return GlobalInjectionUtil.getDirective(key)
    }
}

export default GlobalDirectives