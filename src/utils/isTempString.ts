import {stringRegDoubleQute, stringRegSingleQute} from "../statics/regexp";

const isTempString = (t: string):boolean => {
    return stringRegDoubleQute.test(t) || stringRegSingleQute.test(t)
}

export default isTempString