


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










