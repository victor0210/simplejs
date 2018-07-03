import SimpleNativeComponent from './SimpleNativeComponent'

import ifKeysAllBelongValidator from "../validators/ifKeysAllBelongValidator";

import initSpecComparisonObject from '../statics/initSpecComparisonObject'
import getGlobalCompositeSimpleInstance from "../utils/getGlobalCompositeSimpleInstance";

export default function Simple(spec: any) {
    ifKeysAllBelongValidator(spec, initSpecComparisonObject)

    if (this instanceof Simple) {
        return new SimpleNativeComponent(spec)
    }

    return getGlobalCompositeSimpleInstance(spec)
}