export const text = (node: any, value: string): void => {
    if (value !== node.textContent) node.textContent = value
}