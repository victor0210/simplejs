import CompositeComparisonObject from "../implements/CompositeComparisonObject";
import lifeCycle from "./lifeCycle";
import mergeObjToArr from "../utils/mergeObjToArr";

const baseMap = [
    'el',
    'methods',
    'template',
    'render',
    'data'
]

mergeObjToArr(lifeCycle, baseMap)

const assertion = 'is not allowed in SimpleComponent initialization'

const initSpecComparisonObject = new CompositeComparisonObject(baseMap, assertion)

export default initSpecComparisonObject