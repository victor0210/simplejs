import Simple from '../../../src/core/Simple'
import {triggerEvent} from "../../../src/utils/eventUtils"

describe('Render Test', () => {
    test('render with state', () => {
        let clickTag
        let mouseTag
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
})