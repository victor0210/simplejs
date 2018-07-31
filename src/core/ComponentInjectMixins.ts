import GlobalMixins from "./GlobalMixins";
import baseType from "../statics/baseType";
import matchType from "../utils/matchType";
import GlobalDirectives from "./GlobalDirectives";
import Directive from "./Directive";
import ComponentProxy from "./ComponentProxy";
import GlobalComponents from "./GlobalComponents";

const ComponentInjectMixins: any = {
    mixin(mixin: any): void {
        GlobalMixins.set(mixin)
    },

    component(key: any, component: ComponentProxy): void {
        GlobalComponents.set(key, component)
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