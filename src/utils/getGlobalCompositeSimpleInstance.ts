import SimpleCompositeComponent from "../core/SimpleCompositeComponent";

let globalCompositeSimpleInstance: SimpleCompositeComponent

const getGlobalCompositeSimpleInstance = (spec: any) => {
    if (!globalCompositeSimpleInstance) {
        globalCompositeSimpleInstance = new SimpleCompositeComponent(spec)
    }

    return globalCompositeSimpleInstance
}

export default getGlobalCompositeSimpleInstance