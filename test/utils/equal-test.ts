import {utilDescribe} from "../assrtions/describeConfig";
import equal from '../../src/utils/equal'

describe(utilDescribe('equal'), () => {
    test('stringNumber vs number', () => {
        expect(equal('1', 1)).toBe(false)
    })

    test('number vs number', () => {
        expect(equal(1, 1)).toBe(true)
    })

    test('string vs string', () => {
        expect(equal('string', 'string')).toBe(true)
    })

    test('object vs same object', () => {
        expect(equal({name: 'test'}, {name: 'test'})).toBe(true)
    })

    test('object vs diff object', () => {
        expect(equal({name: 'test'}, {name: '123'})).toBe(false)
    })

    test('array vs same array', () => {
        expect(equal([1, 2, 3], [1, 2, 3])).toBe(true)
    })

    test('array vs diff value array', () => {
        expect(equal([1, 3, 3], [1, 2, 3])).toBe(false)
    })

    test('array vs diff type but same value array', () => {
        expect(equal([1, 2, '3'], [1, 2, 3])).toBe(false)
    })
})