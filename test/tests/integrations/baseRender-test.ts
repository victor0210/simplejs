import Simple from '../../../src/core/Simple'
import getHtmlById from "../../helpers/getHtmlById";

describe('Render Test', () => {
    test('base dom structure by render', () => {
        let component = new Simple({
            render(h) {
                return h('div', {}, [
                    `Welcome to Simple Js`
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
    test('base dom structure by template', () => {
        let component = new Simple({
            template: `
                <div>Welcome to Simple Js</div>
            `
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