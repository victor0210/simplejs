import CompositeComparisonObject from "../../implements/CompositeComparisonObject";
import lifeCycle from "../../statics/lifeCycle";
import mergeToArr from "../../utils/mergeToArr";

const initApiMap = [
    'el',
    'components',
    'state',
    'methods',
    'template',
    'render'
]

mergeToArr(lifeCycle, initApiMap)

const assertion = 'is not allowed in SimpleComponent initialization'

const initSpecComparisonObject = new CompositeComparisonObject(initApiMap, assertion)

export default initSpecComparisonObject