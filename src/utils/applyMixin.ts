/**
 * mixin object into class
 * */
const applyMixin = (target: any, source: any) => {
    for (let key in source) {
        target.prototype[key] = source[key].bind(target)
    }
}

export default applyMixin