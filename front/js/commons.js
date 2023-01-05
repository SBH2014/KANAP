function imgElement(product) {
    console.log(product)
    const imgElement = document.createElement("img");
    imgElement.src = product.imageUrl
    imgElement.alt = product.altTxt
    return imgElement
}

function optionElement(color) {
    // option
    const optionElement = document.createElement("option");
    optionElement.value = color
    optionElement.innerHTML = color
    return optionElement
}

function h3Element(product) {
    // h3
    const h3Element = document.createElement("h3");
    h3Element.className = "productName"
    h3Element.innerHTML = product.name
    return h3Element;
}

function pElement(product) {
    // p
    const pElement = document.createElement("p");
    pElement.className = "productDescription"
    pElement.innerHTML = product.description
    return pElement;

}





