let CurrentContext = {}

export const setCurrentContext = (context: object): void => {
    CurrentContext = context
}

export const getCurrentContext = ():any => {
    return CurrentContext
}
