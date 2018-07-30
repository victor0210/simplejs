import installIf from './installIf'
import installShow from "./installShow";
import installText from "./installText";

//art default directives
const injectDirectives = () => {
    installIf()
    installShow()
    installText()
}

export default injectDirectives