import CompositeComparisonObject from "../implements/CompositeComparisonObject";
import lifeCycle from "./lifeCycle";
import mergeKeyToArr from "../utils/mergeKeyToArr";

const initApiMap = [
    'el',
    'components',
    'data',
    'methods',
    'template',
    'render'
]

mergeKeyToArr(lifeCycle, initApiMap)

const assertion = 'is not allowed in SimpleComponent initialization'

const initSpecComparisonObject = new CompositeComparisonObject(initApiMap, assertion)

export default initSpecComparisonObject