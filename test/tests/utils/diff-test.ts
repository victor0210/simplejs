import {utilDescribe} from "../../assrtions/describeConfig";
import applyMixin from "../../../src/utils/applyMixin";
import VNode from "../../../src/core/VNode";
import equal from "../../../src/utils/equal";
import diffType from "../../../src/statics/diffType";
import Patch from "../../../src/core/Patch";
import diff from "../../../src/utils/diff";

const source = new VNode('div', {}, ['hello'])
const sourceDom = source.render().firstChild

const t1 = new VNode('div', {}, ['hello'])

const t2 = new VNode('div', {}, ['hell'])

const t3 = new VNode('p', {}, ['hell'])

const t4_new_vnode = new VNode('p', {}, ['pt'])
const t4 = new VNode('div', {}, ['hello', t4_new_vnode])

const t5 = new VNode('div', {}, [])

/**
 * mixin object into class
 * */
describe(utilDescribe('diff vnode'), () => {
    test('same compare', () => {
        expect(
            equal(
                diff(source, t1),
                []
            )
        ).toBe(true)
    })

    test('text diff', () => {
        expect(
            equal(
                diff(source, t2),
                [
                    new Patch(diffType.TEXT, t2.children[0].tagName, sourceDom.childNodes[0])
                ]
            )
        ).toBe(true)
    })

    test('tag diff', () => {
        expect(
            equal(
                diff(source, t3),
                [
                    new Patch(diffType.REPLACE, t3, sourceDom, true),
                    new Patch(diffType.TEXT, t3.children[0].tagName, sourceDom.childNodes[0])
                ]
            )
        ).toBe(true)
    })

    test('insert diff', () => {
        expect(
            equal(
                diff(source, t4),
                [
                    new Patch(diffType.INSERT, t4_new_vnode, sourceDom),
                ]
            )
        ).toBe(true)
    })

    test('remove diff', () => {
        expect(
            equal(
                diff(source, t5),
                [
                    new Patch(diffType.REMOVE, null, sourceDom.childNodes[0]),
                ]
            )
        ).toBe(true)
    })
})