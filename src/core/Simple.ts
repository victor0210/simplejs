import SimpleNativeComponent from "./SimpleNativeComponent"
import ComponentRendererMixins from "./ComponentRendererMixins";

import applyMixin from "../utils/applyMixin";

function Simple(spec: any): SimpleNativeComponent {
    return new SimpleNativeComponent(spec)
}

applyMixin(Simple, ComponentRendererMixins)

export default Simple