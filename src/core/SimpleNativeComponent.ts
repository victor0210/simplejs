import SimpleComponent from "../implements/SimpleComponent"

/**
 * @description
 * return a component instance
 * component should be mounted manually if there is not has el option
 * */
export default class SimpleNativeComponent extends SimpleComponent {
    constructor(spec: any) {
        super(spec);
    }

    public mountComponent(): void {
    }

    public updateComponent(): void {
    }

    public unmountComponent(): void {
    }
}