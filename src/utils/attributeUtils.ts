import {DIRECTIVE_TAG, EVENT_TAG, PROP_TAG} from "../statics/attributesType";

export const isProps = (attrName: string): boolean => {
    return attrName.slice(0, 1) === PROP_TAG
}

export const isEvent = (attrName: string): boolean => {
    return attrName.slice(0, 1) === EVENT_TAG
}

export const isDirective = (attrName: string): boolean => {
    return attrName.slice(0, 1) === DIRECTIVE_TAG
}

export const isReactiveIDentifier = (IDentifier: string): boolean => {
    return IDentifier === PROP_TAG
        || IDentifier === EVENT_TAG
        || IDentifier === DIRECTIVE_TAG
}