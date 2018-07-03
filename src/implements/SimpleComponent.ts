export default abstract class SimpleComponent {
    constructor(spec: any) {

    }
    public abstract mountComponent(): void
    public abstract updateComponent(): void
    public abstract unmountComponent(): void
}