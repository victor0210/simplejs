import {baseTester} from "../../helpers/baseTester";
import TestCreator from "../../helpers/TestCreator";
import {isTempString} from "../../../src/utils/tempMatcher";

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
