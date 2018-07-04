import Compiler from "../core/Compiler";

const createComponent = (dangerousHTML: string) => {
    return new Compiler(dangerousHTML)
}

export default createComponent