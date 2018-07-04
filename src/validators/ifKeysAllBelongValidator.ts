import throwIf from "../loggers/throwIf";
import CompositeComparisonObject from "../implements/CompositeComparisonObject";
import hasKey from "../utils/hasKey";

const generateKeyNotBelongMsg = (key: string, assertion: string, assertionSuggestion: string) => {
    return `Error: "${key}" ${assertion}, would like " ${assertionSuggestion} " ?`
}

/**
 * validate if input options' keys beyond comparison object
 * @param tester is who needs validate
 * @param source is standard of comparison
 * */
export default function ifKeysAllBelongValidator(tester: object, source: CompositeComparisonObject) {
    const comparision = source.getComparision()
    const assertion = source.getAssertion()
    const assertionSuggestion = source.getAssertionSuggestion()

    for (let key in tester) {
        throwIf(!hasKey(key, comparision), generateKeyNotBelongMsg(key, assertion, assertionSuggestion))
    }
}