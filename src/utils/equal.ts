/**
 * just compare values if match
 * @description number | string | undefined -> just match value with "==="
 * @description array | object -> first compare memory address --- (if not equal) --> compare deep key
 * */
const equal = (A: any, B: any): boolean => {
    if (typeof A !== typeof B) return false

    if (Array.isArray(A)) {
        return compareArray(A, B)
    } else if (A instanceof Object) {
        return compareObject(A, B)
    }

    return A === B
}

const compareArray = (A: Array<any>, B: Array<any>): boolean => {
    if (A.length !== B.length) return false

    let isEqual = true
    A.some((el, idx) => {
        if (!equal(el, B[idx])) {
            isEqual = false
            return true
        }
    })

    return isEqual
}

const compareObject = (A: any, B: any): boolean => {
    let Akeys = Object.keys(A)
    let Bkeys = Object.keys(B)

    if (Akeys.length !== Bkeys.length) return false

    let isEqual = true
    Akeys.some((key) => {
        if (!equal(A[key], B[key])) {
            isEqual = false
            return true
        }
    })

    return isEqual
}
export default equal