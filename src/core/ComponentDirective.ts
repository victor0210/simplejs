import Directive from "./Directive";
import GlobalDirectives from "./GlobalDirectives";
import baseType from "../statics/baseType";
import matchType from "../utils/matchType";

const ComponentDirective: any = {
    directive(key: string, spec: any): void {
        GlobalDirectives.set(key, new Directive(key, matchType(spec, baseType.Function) ? spec() : spec))
    },
}

export default ComponentDirective