

/** 
 * save product in localStorage
 * @param {object} product 
 */
function saveUpdatedBasketIntoLocalStorage(product) {
    localStorage.setItem("product", JSON.stringify(product))
}

/** 
 * get basket from localStorage 
 * @returns {{productId : string , color : string , quantity : number}}
 */
function getBasketFromLocalStorage() {
    return JSON.parse(localStorage.getItem("product"))
}
/** get product from localStorage by Id 
 * 
 * @param {productId : string , color : string , quantity : number} productsInLocalStorage 
 * @param {productId : string , color : string , quantity : number} optionsProduct 
 * @returns  {boolean}
 */
function getProductFromLocalStorageById(productsInLocalStorage, optionsProduct) {
    return productsInLocalStorage.find((product) => {
        return product.productId === optionsProduct.productId && product.color === optionsProduct.color;
    });

}










