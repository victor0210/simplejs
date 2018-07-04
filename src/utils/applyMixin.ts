/**
 * mixin object into class
 * */
const applyMixin = (target: any, source: any) => {
    for (let key in source) {
        target[key] = source[key]
    }
}

export default applyMixin