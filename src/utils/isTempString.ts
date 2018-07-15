import {STRING_REG_DOUBLE_QUOTE, STRING_REG_SINGLE_QUOTE} from "../statics/regexp";

const isTempString = (t: string):boolean => {
    return STRING_REG_DOUBLE_QUOTE.test(t) || STRING_REG_SINGLE_QUOTE.test(t)
}

export default isTempString