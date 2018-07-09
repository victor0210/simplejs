import SimpleNativeComponent from "./SimpleNativeComponent";

let components: any = {}

const GlobalComponents = {
    set(key: string, component: SimpleNativeComponent) {
        components[key] = component
    },

    get(key: string = undefined): any {
        if (key) return components[key]
        return components
    }
}

export default GlobalComponents