import SimpleNativeComponent from "./SimpleNativeComponent";
import VNode from "./VNode";

export default class ComponentVNode extends VNode {
    constructor(tagName: any = null,
                props: any = {},
                children: Array<any> = [],
                componentInstance?: SimpleNativeComponent) {
        super(tagName, props, children, false, true, componentInstance)
    }
}