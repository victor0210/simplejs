import SimpleNativeComponent from "./SimpleNativeComponent"
import applyMixin from "../utils/applyMixin";
import ComponentRendererMixins from "./ComponentRendererMixins";
import ComponentInjectMixins from "./ComponentInjectMixins";

function Simple (spec: any) {
    return new SimpleNativeComponent(spec)
}

applyMixin(Simple, ComponentRendererMixins)
applyMixin(Simple, ComponentInjectMixins)

export default Simple