function imgElement(product) {
    const imgElement = document.createElement("img");
    imgElement.src = product.imageUrl
    imgElement.alt = product.altTxt
    return imgElement
}

function optionElement(color) {
    // option
    const optionElement = document.createElement("option");
    optionElement.value = color
    optionElement.textContent= color
    return optionElement
}

function h3Element(product) {
    // h3
    const h3Element = document.createElement("h3");
    h3Element.className = "productName"
    h3Element.textContent = product.name
    return h3Element;
}

function pElement(product) {
    // p
    const pElement = document.createElement("p");
    pElement.className = "productDescription"
    pElement.tex = product.description
    return pElement;

}

function saveUpdatedBasketIntoLocalStorage(product) {
    localStorage.setItem("product", JSON.stringify(product))
}

/**
 * 
 * @returns {{productId : number , color : string , quantity : number}}
 */
function getBasketFromLocalStorage() {
    return JSON.parse(localStorage.getItem("product"))
}
/**
 * 
 * @param {productId : number , color : string , quantity : number} productsInLocalStorage 
 * @param {productId : number , color : string , quantity : number} optionsProduct 
 * @returns  {boolean}
 */
function getProductFromLocalStorageById(productsInLocalStorage, optionsProduct) {
    return productsInLocalStorage.find((product) => {
        return product.productId === optionsProduct.productId && product.color === optionsProduct.color;
    });

}

function deleteProductFromLocalStorageById(productsInLocalStorage, optionsProduct) {
    return productsInLocalStorage.find((product) => {
        return product.productId === optionsProduct.productId && product.color === optionsProduct.color;
    });
}

function elementById(id) {
    return document.getElementById(id);
}










