import {baseTester} from "../../helpers/baseTester";
import isTempString from "../../../src/utils/isTempString";
import TestCreator from "../../helpers/TestCreator";

let cases = [
    {
        args: ['string without quote'],
        support: false,
        title: 'string without quote'
    }, {
        args: ['"string with double quotes"'],
        support: true,
        title: 'string with double quotes'
    }, {
        args: ["'string with single quotes'"],
        support: true,
        title: 'string with single quotes'
    }
]

baseTester(new TestCreator(cases), isTempString)
