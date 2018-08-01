const isTempArray = (t: string):boolean => {
    return t.trim()[0] === '[' && t.trim()[t.trim().length -1] === ']'
}

export default isTempArray