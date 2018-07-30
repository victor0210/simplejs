import {utilDescribe} from "../../assrtions/describeConfig";
import equal from "../../../src/utils/equal";
import diffType from "../../../src/statics/diffType";
import Patch from "../../../src/core/Patch";
import diff from "../../../src/utils/diff";
import createVNode from "../../../src/utils/createVNode";

const source = createVNode('div', {}, ['hello'])

const t1 = createVNode('div', {}, ['hello'])

const t2 = createVNode('div', {}, ['hell'])

const t3 = createVNode('p', {}, ['hell'])

const t4_new_vnode = createVNode('p', {}, ['pt'])
const t4 = createVNode('div', {}, ['hello', t4_new_vnode])

const t5 = createVNode('div', {}, [])

const t6 = createVNode('div', {
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

    // test('text diff', () => {
    //     expect(
    //         equal(
    //             diff(source, t2),
    //             {
    //                 patch: undefined,
    //                 sub: [
    //                     {patch: new Patch(diffType.TEXT, source.children[0], t2), sub: []}
    //                 ]
    //             }
    //         )
    //     ).toBe(true)
    // })
    //
    // test('tag diff', () => {
    //     expect(
    //         equal(
    //             diff(source, t3),
    //             {
    //                 patch: new Patch(diffType.REPLACE, source, t3),
    //                 sub: []
    //             }
    //         )
    //     ).toBe(true)
    // })
    //
    // test('insert diff', () => {
    //     expect(
    //         equal(
    //             diff(source, t4),
    //             {
    //                 patch: undefined,
    //                 sub: [
    //                     {
    //                         patch: undefined,
    //                         sub: []
    //                     }, {
    //                         patch: new Patch(diffType.INSERT, source.children[1], t4_new_vnode),
    //                         sub: []
    //                     }
    //                 ]
    //             }
    //         )
    //     ).toBe(true)
    // })
    //
    // test('remove diff', () => {
    //     expect(
    //         equal(
    //             diff(source, t5),
    //             {
    //                 patch: undefined,
    //                 sub: [
    //                     {
    //                         patch: new Patch(diffType.REMOVE, source.children[0], t5.children[0]),
    //                         sub: []
    //                     }
    //                 ]
    //             }
    //         )
    //     ).toBe(true)
    // })
    //
    // test('props diff', () => {
    //     expect(
    //         equal(
    //             diff(source, t6),
    //             {
    //                 patch: new Patch(diffType.PROPS, source, t6),
    //                 sub: [
    //                     {
    //                         patch: undefined,
    //                         sub: []
    //                     }
    //                 ]
    //             }
    //         )
    //     ).toBe(true)
    // })
})