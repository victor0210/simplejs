import isTempString from "./isTempString";
import isTempNumber from "./isTempNumber";

const isTempFunction = (t: string):boolean => {
    return !isTempString(t) && !isTempNumber(t) && (t.indexOf('(') !== -1)
}

export default isTempFunction