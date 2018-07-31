import Simple from '../../../src/core/Simple'
import getHtmlById from "../../helpers/getHtmlById";

describe('Render Test', () => {
    test('render dom props', () => {
        let component = new Simple({
            render(h) {
                return h('div', {
                    domProps: {
                        name: 'hello'
                    }
                }, [
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
    test('render dom props with compile', () => {
        let component = new Simple({
            template: `
                <div name="hello">Welcome to Simple Js</div>
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
    return `<div name="hello">Welcome to Simple Js</div>`
}