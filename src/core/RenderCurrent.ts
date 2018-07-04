let Current = {}

export const setCurrentContext = (component: any): void => {
    Current = component
}

export const getCurrentContext = ():any => {
    return Current
}
