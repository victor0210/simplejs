import {utilDescribe} from "../../assrtions/describeConfig";
import applyMixin from "../../../src/utils/applyMixin";
import VNode from "../../../src/core/VNode";
import equal from "../../../src/utils/equal";
import diffType from "../../../src/statics/diffType";
import Patch from "../../../src/core/Patch";
import diff from "../../../src/utils/diff";

const source = new VNode('div', {}, ['hello'])

const t1 = new VNode('div', {}, ['hello'])

const t2 = new VNode('div', {}, ['hell'])

const t3 = new VNode('p', {}, ['hell'])

const t4_new_vnode = new VNode('p', {}, ['pt'])
const t4 = new VNode('div', {}, ['hello', t4_new_vnode])

const t5 = new VNode('div', {}, [])

const t6 = new VNode('div', {
    props: {
        age: 1
    }
}, ['hello'])

/**
 * mixin object into class
 * */
describe(utilDescribe('diff vnode'), () => {
    test('same compare', () => {
        expect(
            equal(
                diff(source, t1),
                {
                    patch: undefined,
                    sub: [
                        {patch: undefined, sub: []}
                    ]
                }
            )
        ).toBe(true)
    })

    test('text diff', () => {
        expect(
            equal(
                diff(source, t2),
                {
                    patch: undefined,
                    sub: [
                        {patch: new Patch(diffType.TEXT, 'hell'), sub: []}
                    ]
                }
            )
        ).toBe(true)
    })

    test('tag diff', () => {
        expect(
            equal(
                diff(source, t3),
                {
                    patch: new Patch(diffType.REPLACE, t3, source.tagName),
                    sub: []
                }
            )
        ).toBe(true)
    })

    test('insert diff', () => {
        expect(
            equal(
                diff(source, t4),
                {
                    patch: undefined,
                    sub: [
                        {
                            patch: undefined,
                            sub: []
                        }, {
                            patch: new Patch(diffType.INSERT, t4_new_vnode),
                            sub: []
                        }
                    ]
                }
            )
        ).toBe(true)
    })

    test('remove diff', () => {
        expect(
            equal(
                diff(source, t5),
                {
                    patch: undefined,
                    sub: [
                        {
                            patch: new Patch(diffType.REMOVE, null, source.children[0].tagName),
                            sub: []
                        }
                    ]
                }
            )
        ).toBe(true)
    })

    test('props diff', () => {
        expect(
            equal(
                diff(source, t6),
                {
                    patch: new Patch(diffType.PROPS, t6.props, source.tagName),
                    sub: [
                        {
                            patch: undefined,
                            sub: []
                        }
                    ]
                }
            )
        ).toBe(true)
    })
})