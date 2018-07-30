import SimpleNativeComponent from "./SimpleNativeComponent";

let Current: SimpleNativeComponent

export const setCurrentContext = (component: SimpleNativeComponent): void => {
    Current = component
}

export const getCurrentContext = (): SimpleNativeComponent => {
    return Current
}
