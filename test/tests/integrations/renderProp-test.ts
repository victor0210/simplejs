import Simple from '../../../src/core/Simple'
import getHtmlById from "../../helpers/getHtmlById";

describe('Render Test', () => {
    test('render with props', () => {
        const Component_1 = new Simple({
            render: function (h) {
                return h('div', {}, [
                    `Welcome to ${this.props.name}`,
                ])
            }
        })

        const Component_2 = new Simple({
            state: {
                name: 'Simple Js'
            },

            render: function (h) {
                return h('div', {}, [
                    'I am parent',
                    h(Component_1, {
                        props: {
                            name: 'Simple Js'
                        }
                    })
                ])
            }
        })


        let renderHtml = getRenderHtml()

        // Set up our document body
        document.body.innerHTML = `<div id="app"></div>`

        Simple.mount('#app', Component_2)
        // This module has a side-effect

        // Assert that the fetchCurrentUser function was called, and that the
        // #username span's inner text was updated as we'd expect it to.
        expect(getHtmlById('app')).toBe(renderHtml);
    })
})

const getRenderHtml = () => {
    return `<div>I am parent<div>Welcome to Simple Js</div></div>`
}