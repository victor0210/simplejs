import {utilDescribe} from "../../assrtions/describeConfig";
import applyMixin from "../../../src/utils/applyMixin";

function A() {}

const objB: any = {
    propB: null,
    methodB: () => {}
}

const objC: any = {
    propC: null,
    methodC: () => {}
}

const targetKeys = [
    'propC',
    'methodC',
    'propB',
    'methodB'
]
/**
 * mixin object into class
 * */
describe(utilDescribe('applyMixin'), () => {
    test('mixin class B to class A', () => {
        applyMixin(A, objB)
        applyMixin(A, objC)

        targetKeys.forEach(key => {
            expect(A[key]).not.toBeUndefined()
        })
    })
})