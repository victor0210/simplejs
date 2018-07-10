import {utilDescribe} from "../assrtions/describeConfig";
import TestCreator from "./TestCreator";

/**
 * just supported for which without extra options and only compare return value
 * */
export const baseTester = (tc: TestCreator, fun: any) => {
    describe(utilDescribe(fun.name), () => {
        tc.rules.forEach((uc: any) => {
            test(uc.title, () => {
                expect(fun(...uc.args)).toBe(uc.support)
            })
        })
    })
}