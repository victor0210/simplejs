import lifeCycle from "../statics/lifeCycle";

const filterLifeCycleHooks = (spec: any): any => {
    let hooks: any = {}

    for (let key in lifeCycle) {
        let lc = lifeCycle[key]
        if (spec[lc]) {
            hooks[lc] = spec[lc]
        }
    }

    return hooks
}

export default filterLifeCycleHooks