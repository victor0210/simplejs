import Compiler from "../core/Compiler";
import {getCurrentContext} from '../core/RenderCurrent'

const createComponent = (dangerousHTML: string) => {
    return new Compiler(dangerousHTML, getCurrentContext())
}

export default createComponent