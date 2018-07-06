import {utilDescribe} from "../assrtions/describeConfig";
import isTempString from "../../src/utils/isTempString";

describe(utilDescribe('isTempString'), () => {
    test('string without quote', () => {
        expect(isTempString('string without quote')).toBe(false)
    })

    test('string with double quotes', () => {
        expect(isTempString('"string with double quotes"')).toBe(true)
    })

    test('string with single quotes', () => {
        expect(isTempString("'string with single quotes'")).toBe(true)
    })
})