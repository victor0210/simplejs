/**
 * merge new state to old state
 * if there are no diffs return false, else return true
 * */
const merge = (source: any, target: any) => {
    let hasDiff = false

    for (let key in target) {
        if (source[key] !== target[key]) {
            hasDiff = true
            source[key] = target[key]
        }
    }

    return hasDiff
}

export default merge