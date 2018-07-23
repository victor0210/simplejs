import Simple from '../../../src/core/Simple'
import getHtmlById from "../../helpers/getHtmlById";

describe('Render Test', () => {
    test('render with state', () => {
        let component = new Simple({
            state: {
                name: 'Simple Js'
            },
            render(h) {
                return h('div', {}, [
                    `Welcome to ${this.state.name}`
                ])
            }
        })

        let renderHtml = getRenderHtml()

        // Set up our document body
        document.body.innerHTML = `<div id="app"></div>`

        Simple.mount('#app', component)

        // This module has a side-effect

        // Assert that the fetchCurrentUser function was called, and that the
        // #username span's inner text was updated as we'd expect it to.
        expect(getHtmlById('app')).toBe(renderHtml);
    })
})

const getRenderHtml = () => {
    return `<div>Welcome to Simple Js</div>`
}