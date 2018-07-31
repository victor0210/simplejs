import equal from "./equal";

export const removeFromArr = (arr: Array<any>, item: any) => {
    arr.some((el, idx) => {
        if (equal(el, item)) {
            arr.splice(idx, 1)
            return true
        }
    })
}

export const removeComponentFromArr = (arr: Array<any>, item: any) => {
    let idx = arr.indexOf(item)

    if (idx !== -1) {
        arr.splice(idx, 1)
    }
}