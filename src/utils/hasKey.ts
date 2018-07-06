/**
 * if the target (Array | Object) has the congruent key, weak key would return false
 * */
const hasKey = (key: string, target: Array<any> | object) => {
    return target instanceof Array
        ? target.indexOf(key) !== -1
        : key in target
}

export default hasKey