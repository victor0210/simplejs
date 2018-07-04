const rootTag: string = 'div'

const transToFragment = (documentString: string): DocumentFragment => {
    let container = document.createElement(rootTag)
    container.innerHTML = documentString

    let fragment = document.createDocumentFragment()
    fragment.appendChild(container.firstChild)

    return fragment
}

export default transToFragment