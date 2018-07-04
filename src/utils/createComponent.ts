import Compiler from "../core/Compiler";

const createComponent = (dangerousHTML: string) => {
    let renderComponent = new Compiler(dangerousHTML)
    return renderComponent.fragment
}

export default createComponent