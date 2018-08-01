import {REG_NEG, REG_POS, STRING_REG_DOUBLE_QUOTE, STRING_REG_SINGLE_QUOTE} from "../statics/regexp";

export const isTempArray = (t: string):boolean => {
    return t.trim()[0] === '[' && t.trim()[t.trim().length -1] === ']'
}

export const isTempBoolean = (t: string):boolean => {
    return t == 'true' || t == 'false'
}

export const isTempFunction = (t: string):boolean => {
    return !isTempString(t) && !isTempNumber(t) && (t.indexOf('(') !== -1)
}

export const isTempNumber = (t: string):boolean => {
    return REG_POS.test(t) || REG_NEG.test(t);
}

export const isTempString = (t: string):boolean => {
    return STRING_REG_DOUBLE_QUOTE.test(t) || STRING_REG_SINGLE_QUOTE.test(t)
}

export const isTempObject = (t: string):boolean => {
    return t.trim()[0] === '{' && t.trim()[t.trim().length -1] === '}'
}
