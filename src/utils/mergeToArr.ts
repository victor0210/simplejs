import throwIf from "../loggers/throwIf";

const mergeToArr = (source: Array<any> | Object, target: Array<any>) => {
    throwIf(
        !(source instanceof Object),
        'only Array && Object can be merged!'
    )

    if (Array.isArray(source)) {
        mergeArr(source, target)
    } else {
        mergeObjKey(source, target)
    }
}

const mergeObjKey = (obj: any, target: Array<any>): void => {
    for (let key in obj) {
        if (target.indexOf(obj[key]) === -1) target.push(obj[key])
    }
}

const mergeArr = (arr: Array<any>, target: Array<any>): void => {
    arr.forEach(key => {
        if (target.indexOf(key) === -1) target.push(key)
    })
}

export default mergeToArr