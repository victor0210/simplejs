import CompositeComparisonObject from "../implements/CompositeComparisonObject";

const keyMap = [
    'el',
    'methods',
    'template',
    'render',
    'beforeMount',
    'mounted',
    'beforeUpdate',
    'updated',
    'beforeDestroy',
    'destroyed',
]

const assertion = 'is not allowed in SimpleComponent initialization'

const initSpecComparisonObject = new CompositeComparisonObject(keyMap, assertion)

export default initSpecComparisonObject