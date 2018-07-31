import Simple from '../../../src/core/Simple'
import {triggerEvent} from "../../../src/utils/eventUtils"

describe('Render Test', () => {
    test('render with event bind', () => {
        let clickTag: any
        let mouseTag: any
        let component = new Simple({
            state: {
                name: 'Simple Js'
            },
            render(h) {
                return h('div', {
                    events: {
                        click: () => {
                            clickTag = true
                        },
                        mouseover: () => {
                            mouseTag = 'mouseTag'
                        }
                    }
                }, [
                    `Welcome to ${this.state.name}`
                ])
            }
        })

        // Set up our document body
        document.body.innerHTML = `<div id="app"></div>`

        Simple.mount('#app', component)

        // This module has a side-effect
        triggerEvent(document.getElementById('app').firstChild, 'click')
        triggerEvent(document.getElementById('app').firstChild, 'mouseover')

        expect(clickTag).toBe(true)
        expect(mouseTag).toBe('mouseTag')
    })

    test('render with compile event', () => {
        let clickTag: any
        let mouseTag: any
        let component = new Simple({
            state: {
                name: 'Simple Js'
            },

            template: `
                <div @click="handleClick" @mouseover="handleMouseOver">
                    Welcome to {state.name}
                </div>
            `,

            methods: {
                handleClick() {
                    clickTag = true
                },

                handleMouseOver() {
                    mouseTag = 'mouseTag'
                }
            }
        })

        // Set up our document body
        document.body.innerHTML = `<div id="app"></div>`

        Simple.mount('#app', component)

        // This module has a side-effect
        triggerEvent(document.getElementById('app').firstChild, 'click')
        triggerEvent(document.getElementById('app').firstChild, 'mouseover')

        expect(clickTag).toBe(true)
        expect(mouseTag).toBe('mouseTag')
    })
})