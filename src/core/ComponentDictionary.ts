import SimpleNativeComponent from "./SimpleNativeComponent";
import throwIf from "../loggers/throwIf";

let componentMaps: any = {}

export const registerComponent = (component: SimpleNativeComponent) => {
    componentMaps[component._uid] = component
}

export const cancelComponent = (component: SimpleNativeComponent) => {
    delete componentMaps[component._uid]
}

export const getComponentByUID = (componentUID: number) => {
    throwIf(
        !componentMaps.hasOwnProperty(componentUID),
        `UID: "${componentUID}" is not registered in componentMaps`
        )
}

/**
 * A dictionary for the convenience of the basic routine
 * */
const ComponentDictionary = {
    registerComponent: registerComponent,
    cancelComponent: cancelComponent,
    getComponentByUID: getComponentByUID
}

export default ComponentDictionary