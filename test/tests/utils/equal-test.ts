import equal from '../../../src/utils/equal'
import {baseTester} from "../../helpers/baseTester";
import TestCreator from "../../helpers/TestCreator";

let cases = [
    {
        args: ['1', 1],
        support: false,
        title: 'stringNumber vs number'
    }, {
        args: [1, 1],
        support: true,
        title: 'number vs number'
    }, {
        args: ['string', 'string'],
        support: true,
        title: 'string vs string'
    }, {
        args: [{name: 'test'}, {name: 'test'}],
        support: true,
        title: 'object vs same object'
    }, {
        args: [{name: 'test'}, {name: '123'}],
        support: false,
        title: 'object vs diff object'
    }, {
        args: [[1, 2, 3], [1, 2, 3]],
        support: true,
        title: 'array vs same array'
    }, {
        args: [[1, 3, 3], [4, 9, 4]],
        support: false,
        title: 'array vs diff value array'
    }, {
        args: [[1, 2, '3'], [1, 2, 3]],
        support: false,
        title: 'array vs diff type but same value array'
    }
]

baseTester(new TestCreator(cases), equal)
