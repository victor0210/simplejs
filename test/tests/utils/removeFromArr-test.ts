import removeFromArr from "../../../src/utils/removeFromArr";
import {utilDescribe} from "../../assrtions/describeConfig";
import equal from "../../../src/utils/equal";

describe(utilDescribe('removeFromArr'), () => {
    test('remove number', () => {
        runner([1, 2, 3], 1, [2, 3])
    })

    test('remove arr', () => {
        runner([[1], 2, 3], [1], [2, 3])
    })

    test('remove obj', () => {
        runner([{name: 1}, 2, 3], {name: 1}, [2, 3])
    })
})

const runner = (source: Array<any>, removeItem: any, target: Array<any>): void => {
    removeFromArr(source, removeItem)
    expect(equal(source, target)).toBe(true)
}