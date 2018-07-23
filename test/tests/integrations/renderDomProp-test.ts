import Simple from '../../../src/core/Simple'

describe('Render Test', () => {
    test('render with state', () => {
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
})

const getHtmlById = (id: string) => {
    return document.getElementById(id).innerHTML.trim()
}

const getRenderHtml = () => {
    return `<div name="hello">Welcome to Simple Js</div>`
}