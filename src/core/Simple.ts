import applyMixin from "../utils/applyMixin";
import ComponentRendererMixins from "./ComponentRendererMixins";
import ComponentInjectMixins from "./ComponentInjectMixins";
import SimpleNativeComponentCreator from "./SimpleNativeComponentCreator";
import ComponentDirective from "./ComponentDirective";

function Simple (spec: any) {
    return new SimpleNativeComponentCreator(spec)
}

applyMixin(Simple, ComponentRendererMixins)
applyMixin(Simple, ComponentInjectMixins)
applyMixin(Simple, ComponentDirective)

export default Simple