import '../../../src/index'
import getHtmlById from "../../helpers/getHtmlById";

describe('Render Test', () => {
    test('destroy component', () => {
        let component = new Simple({
            state: {
                name: 'before change'
            },

            render(h) {
                return h('div', {}, [
                    `Welcome to ${this.state.name}`
                ])
            },

            mounted() {
                this.destroy()
                expect(getHtmlById('app')).toBe(renderHtml)
            }
        })

        let renderHtml = getUpdatedHtml()

        // Set up our document body
        document.body.innerHTML = `<div id="app"></div>`

        Simple.mount('#app', component)
    })
})

const getUpdatedHtml = () => {
    return ``
}