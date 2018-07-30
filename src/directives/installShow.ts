import Simple from '../core/Simple'

const installShow = () => {
    Simple.directive('show', () => {
        const checkShow = (el: any, value: any) => {
            if (value) {
                el.style.display = 'block'
            } else {
                el.style.display = 'none'
            }
        }

        return {
            insert: (el: any, value: any) => {
                checkShow(el, value)
            },

            update: (el: any, value: any) => {
                checkShow(el, value)
            }
        }
    })
}

export default installShow