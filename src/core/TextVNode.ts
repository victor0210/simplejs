import SimpleNativeComponent from "./SimpleNativeComponent";
import VNode from "./VNode";

export default class TextVNode extends VNode {
    constructor(tagName: any = null,
                componentInstance?: SimpleNativeComponent) {
        super(tagName, {}, [], true, false, componentInstance)
    }
}