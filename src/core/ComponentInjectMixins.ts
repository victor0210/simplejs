import SimpleNativeComponent from "./SimpleNativeComponent";
import GlobalMixins from "./GlobalMixins";
import baseType from "../statics/baseType";
import matchType from "../utils/matchType";
import GlobalDirectives from "./GlobalDirectives";
import Directive from "./Directive";

const ComponentInjectMixins: any = {
    mixin(mixin: any): void {
        GlobalMixins.set(mixin)
    },

    component(key: any, component: SimpleNativeComponent): void {
        GlobalMixins.set(component)
    },

    directive(key: any, directiveLifeHooks: any): void {
        GlobalDirectives.set(key, new Directive(
            key,
            matchType(directiveLifeHooks, baseType.Function)
                ? directiveLifeHooks()
                : directiveLifeHooks)
        )
    }
}

export default ComponentInjectMixins