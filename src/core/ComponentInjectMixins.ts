import ComponentGlobalDictionary from "./ComponentGlobalDictionary";
import SimpleNativeComponent from "./SimpleNativeComponent";
import throwIf from "../loggers/throwIf";
import merge from "../utils/merge";
import GlobalMixins from "./GlobalMixins";

const ComponentInjectMixins: any = {
    //inject global plugins
    // inject(injection: any): void {
    //     throwIf(!injection.install,
    //         'injection must has install method'
    //     )
    //
    //     injection.install()
    // },

    mixin(mixin: any): void {
        GlobalMixins.set(mixin)
    },

    //inject global components
    component(key: any, component: SimpleNativeComponent): void {
        GlobalMixins.set(component)
    }
}

export default ComponentInjectMixins