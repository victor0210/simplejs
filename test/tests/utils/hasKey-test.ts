import {baseTester} from "../../helpers/baseTester";
import hasKey from "../../../src/utils/hasKey";
import TestCreator from "../../helpers/TestCreator";

let cases = [
    {
        args: ['1', ['1', '2']],
        support: true,
        title: 'array test match key'
    }, {
        args: ['1', [1, '2']],
        support: false,
        title: 'array test weak key'
    }, {
        args: ['name', {name: 'bennnis', age: '20'}],
        support: true,
        title: 'object test key'
    }, {
        args: ['sex', {name: 'bennnis', age: '20'}],
        support: false,
        title: 'object test key'
    },
]

baseTester(new TestCreator(cases), hasKey)