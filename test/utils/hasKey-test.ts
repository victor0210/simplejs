import hasKey from '../../src/utils/hasKey'
import {utilDescribe} from "../assrtions/describeConfig";

describe(utilDescribe('hasKey'), () => {
    test('array test match key', () => {
        expect(hasKey('1', ['1', '2'])).toBe(true)
    })

    test('array test weak key', () => {
        expect(hasKey('1', [1, '2'])).toBe(false)
    })

    test('object test key', () => {
        expect(hasKey('name', {
            name: 'bennnis',
            age: '20'
        })).toBe(true)
    })
})
