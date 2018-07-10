import {baseTester} from "../../helpers/baseTester";
import TestCreator from "../../helpers/TestCreator";
import {getVM, setVM} from "../../../src/utils/vmUtils";

//getter test
let getterCases = [
    {
        args: ['vm', {vm: 'vmval'}],
        support: 'vmval',
        title: 'direct prop'
    },
    {
        args: ['vm.name', {vm: {name: 'vmval'}}],
        support: 'vmval',
        title: 'point separator prop'
    },
    {
        args: ['vm.name[0]', {vm: {name: ['vmval']}}],
        support: 'vmval',
        title: 'point separator & arr separator prop'
    },
    {
        args: ['vm[0].name', {vm: [{name: 'vmval'}]}],
        support: 'vmval',
        title: 'point separator & arr separator prop'
    },
    {
        args: ['vm[0].name[0]', {vm: [{name: ['vmval']}]}],
        support: 'vmval',
        title: 'point separator & arr separator prop'
    }
]

baseTester(new TestCreator(getterCases), getVM)

// //setter test
// let setterCases = [
//     {
//         args: ['vm', {vm: 'vmval'}],
//         support: 'vmval',
//         title: 'direct prop'
//     },
//     {
//         args: ['vm.name', {vm: {name: 'vmval'}}],
//         support: 'vmval',
//         title: 'point separator prop'
//     },
//     {
//         args: ['vm.name[0]', {vm: {name: ['vmval']}}],
//         support: 'vmval',
//         title: 'point separator & arr separator prop'
//     },
//     {
//         args: ['vm[0].name', {vm: [{name: 'vmval'}]}],
//         support: 'vmval',
//         title: 'point separator & arr separator prop'
//     },
//     {
//         args: ['vm[0].name[0]', {vm: [{name: ['vmval']}]}],
//         support: 'vmval',
//         title: 'point separator & arr separator prop'
//     }
// ]
//
// baseTester(new TestCreator(setterCases), setVM)