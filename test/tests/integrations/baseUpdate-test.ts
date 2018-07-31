import Simple from '../../../src/core/Simple'
import getHtmlById from "../../helpers/getHtmlById";

describe('Render Test', () => {
    test('render with updated state', () => {
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
                expect(getHtmlById('app')).toBe(getBeforeUpdateHtml());
                this.setState({
                    name: 'after change'
                })
            },

            updated() {
                expect(getHtmlById('app')).toBe(getUpdatedHtml());
            }
        })

        // Set up our document body
        document.body.innerHTML = `<div id="app"></div>`

        Simple.mount('#app', component)
    })
    test('template with updated state', () => {
        let component = new Simple({
            state: {
                name: 'before change'
            },

            template:`
                <div>Welcome to {state.name}</div>
            `,

            mounted() {
                expect(getHtmlById('app')).toBe(getBeforeUpdateHtml());
                this.setState({
                    name: 'after change'
                })
            },

            updated() {
                expect(getHtmlById('app')).toBe(getUpdatedHtml());
            }
        })

        // Set up our document body
        document.body.innerHTML = `<div id="app"></div>`

        Simple.mount('#app', component)
    })
})

const getBeforeUpdateHtml = () => {
    return `<div>Welcome to before change</div>`
}

const getUpdatedHtml = () => {
    return `<div>Welcome to after change</div>`
}