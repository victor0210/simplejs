const mergeKeyToArr = (obj: any, arr: Array<any>) => {
    for (let key in obj) {
        arr.push(obj[key])
    }
}

export default mergeKeyToArr