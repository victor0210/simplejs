import applyMixin from "../utils/applyMixin";
import ComponentRendererMixins from "./ComponentRendererMixins";
import ComponentInjectMixins from "./ComponentInjectMixins";
import ComponentProxy from "./ComponentProxy";
import injectDirectives from "../directives/injectDirectives";

function Simple (spec: any) {
    return new ComponentProxy(spec)
}

applyMixin(Simple, ComponentRendererMixins)
applyMixin(Simple, ComponentInjectMixins)

injectDirectives()

export default Simple