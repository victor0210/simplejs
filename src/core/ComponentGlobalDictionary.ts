import SimpleNativeComponent from "./SimpleNativeComponent";
import throwIf from "../loggers/throwIf";

let componentGlobalMaps: any = {}

export const registerGlobalComponent = (key: string, component: SimpleNativeComponent) => {
    throwIf(componentGlobalMaps.hasOwnProperty(key),
        `component ${key} couldn't register for more than once!`
    )
    componentGlobalMaps[key] = component
}

export const cancelGlobalComponent = (component: SimpleNativeComponent) => {
    delete componentGlobalMaps[component._uid]
}

export const getGlobalComponentByUID = (componentUID: number) => {
    throwIf(
        !componentGlobalMaps.hasOwnProperty(componentUID),
        `UID: "${componentUID}" is not registered in componentMaps`
    )
}

/**
 * A dictionary for the convenience of the basic routine
 * */
const ComponentGlobalDictionary = {
    registerGlobalComponent: registerGlobalComponent,
    cancelGlobalComponent: cancelGlobalComponent,
    getGlobalComponentByUID: getGlobalComponentByUID
}

export default ComponentGlobalDictionary