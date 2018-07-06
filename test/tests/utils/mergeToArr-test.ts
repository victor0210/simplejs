import {utilDescribe} from "../../assrtions/describeConfig";
import mergeToArr from "../../../src/utils/mergeToArr";
import equal from "../../../src/utils/equal";

let t = ['k1', 'k2']

let s_arr_1 = ['k3', 'k4']
let s_arr_2 = ['k2', 'k3']

let s_obj_1: object = {
    anyKey: 'k3',
    test: 'k4'
}

let s_obj_2: object = {
    anyKey: 'k2',
    test: 'k3'
}

let target_1 = ['k1', 'k2', 'k3', 'k4']
let target_2 = ['k1', 'k2', 'k3']

describe(utilDescribe('mergeToArr'), () => {
    test('merge arr to arr', () => {
        let t1 = t.slice()
        mergeToArr(s_arr_1, t1)
        expect(equal(target_1, t1)).toBe(true)
    })
    test('merge arr to arr with same key', () => {
        let t2 = t.slice()
        mergeToArr(s_arr_2, t2)
        expect(equal(target_2, t2)).toBe(true)
    })
    test('merge obj to arr', () => {
        let t3 = t.slice()
        mergeToArr(s_obj_1, t3)
        expect(equal(target_1, t3)).toBe(true)
    })
    test('merge obj to arr with same key', () => {
        let t4 = t.slice()
        mergeToArr(s_obj_2, t4)
        expect(equal(target_2, t4)).toBe(true)
    })
})