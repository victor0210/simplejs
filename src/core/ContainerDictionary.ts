import SimpleNativeComponent from "./SimpleNativeComponent";
import throwIf from "../loggers/throwIf";

let containerMaps: any = {}

let rootIdCounter: number = 0

export const registerContainer = (selector: string) => {
    let root = document.querySelector(selector)
    const rootId = ++rootIdCounter

    containerMaps[selector] = {
        _rootId: rootId,
        _root: root
    }

    return root
}

export const cancelContainer = (selector: string) => {
    delete containerMaps[selector]
}

export const getContainerByRootId = (selector: string) => {
    return containerMaps[selector]
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