import Directive from "./Directive";

let directives: any = {}

const GlobalDirectives = {
    set(key: string, directive: Directive) {
        directives[key] = directive
    },

    get(key: string): any {
        return directives[key]
    }
}

export default GlobalDirectives