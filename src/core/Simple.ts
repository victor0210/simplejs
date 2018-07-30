import applyMixin from "../utils/applyMixin";
import ComponentRendererMixins from "./ComponentRendererMixins";
import ComponentInjectMixins from "./ComponentInjectMixins";
import ComponentProxy from "./ComponentProxy";
import injectDirectives from "../directives/injectDirectives";

let hasInjected: boolean

function Simple(spec: any) {
    if (!hasInjected) {
        injectDirectives()
        hasInjected = true
    }

    return new ComponentProxy(spec)
}

applyMixin(Simple, ComponentRendererMixins)
applyMixin(Simple, ComponentInjectMixins)

export default Simple