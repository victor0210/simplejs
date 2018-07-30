import Simple from '../../../src/core/Simple'

describe('LifeCycleHooks Test', () => {
    test('test if life cycle hook run well', () => {
        let lc: any = {
            BEFORE_CREATE : false,
            CREATED : false,
            BEFORE_MOUNT : false,
            MOUNTED : false,
            BEFORE_UPDATE : false,
            UPDATED : false,
            BEFORE_DESTROY : false,
            DESTROYED : false
        }

        let component = new Simple({
            state: {
                name: 'before change'
            },

            render(h) {
                return h('div', {}, [
                    `Welcome to ${this.state.name}`
                ])
            },

            beforeCreate() {
                lc.BEFORE_CREATE = true
            },

            created() {
                lc.CREATED = true
            },

            beforeMount() {
                lc.BEFORE_MOUNT = true
            },

            mounted() {
                lc.MOUNTED = true
                this.setState({
                    name: 'after change'
                })
            },

            beforeUpdate() {
                lc.BEFORE_UPDATE = true
            },

            updated() {
                lc.UPDATED = true
                this.destroy()
            },

            beforeDestroy() {
                lc.BEFORE_DESTROY = true
            },

            destroyed() {
                lc.DESTROYED = true
            }
        })

        // Set up our document body
        document.body.innerHTML = `<div id="app"></div>`

        Simple.mount('#app', component)

        for (let key in lc) {
            expect(lc[key]).toBe(true)
        }
    })
})
