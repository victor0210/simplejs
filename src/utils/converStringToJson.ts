const convertStringToJson = (s: string) => {
    return eval("(" + s + ")")
}

export default convertStringToJson