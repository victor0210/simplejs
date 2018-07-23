const getHtmlById = (id: string) => {
    return document.getElementById(id).innerHTML.trim()
}

export default getHtmlById