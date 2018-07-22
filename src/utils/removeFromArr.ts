const removeFromArr = (arr: Array<any>, item: any) => {
    arr.some((el, idx) => {
        if (el === item) {
            arr.splice(idx, 1)
            return true
        }
    })
}

export default removeFromArr