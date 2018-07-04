export default abstract class SimpleComponent {
    public abstract mountComponent(): void
    public abstract updateComponent(): void
    public abstract unmountComponent(): void
}