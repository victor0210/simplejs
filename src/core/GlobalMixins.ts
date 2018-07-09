import merge from "../utils/merge";

let mixins: any = {}

const GlobalMixins = {
    set(mixin: any) {
        merge(mixins, Object.assign({}, {
            mixins: mixin.mixins,
            state: mixin.mixins,
            methods: mixin.methods
        }))
    },

    get(): any {
        return mixins
    }
}

export default GlobalMixins