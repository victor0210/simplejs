import SimpleNativeComponent from './SimpleNativeComponent'

import applyMixin from "../utils/applyMixin";
import ComponentRendererMixins from "./ComponentRenderer";

function Simple(spec: any): SimpleNativeComponent {
    return new SimpleNativeComponent(spec)
}

applyMixin(Simple, ComponentRendererMixins)

export default Simple