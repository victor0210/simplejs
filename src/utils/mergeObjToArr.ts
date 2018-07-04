const mergeObjToArr = (obj: any, arr: Array<any>) => {
    for (let key in obj) {
        arr.push(obj[key])
    }
}

export default mergeObjToArr