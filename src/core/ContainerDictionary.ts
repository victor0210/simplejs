import SimpleNativeComponent from "./SimpleNativeComponent";
import throwIf from "../loggers/throwIf";

let containerMaps: any = {}

export const registerContainer = (container: SimpleNativeComponent) => {
    containerMaps[container._uid] = container
}

export const cancelContainer = (container: SimpleNativeComponent) => {
    delete containerMaps[container._uid]
}

export const getContainerByRootId = (rootId: number) => {
    throwIf(
        !containerMaps.hasOwnProperty(rootId),
        `RootId: "${rootId}" is not registered in componentMaps`
        )
}

/**
 * A dictionary for the convenience of the basic routine
 * */
const ContainerDictionary = {
    registerContainer: registerContainer,
    cancelContainer: cancelContainer,
    getContainerByRootId: getContainerByRootId
}

export default ContainerDictionary