import GlobalInjectionUtil from "./GlobalInjection";

const GlobalMixins = {
    set(mixin: any) {
        GlobalInjectionUtil.mixin(mixin)
    }
}

export default GlobalMixins