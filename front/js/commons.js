

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
/**
 * function to modify the quantities of the basket
 * @param {object { productId : string , color : string , quantity : number }} item 
 * @param {number} value 
 */
function changeQuantityInBasket(item, value) {
    const basket = getBasketFromLocalStorage()
    const findProduct = basket.find(product => item.productId === product.productId && item.color === product.color);
    if (findProduct) {
        findProduct.quantity = value > 100 ? 100 : value < 1 ? 1 : value;

    }

    saveUpdatedBasketIntoLocalStorage(basket);
}
/**
 * function to dynamically remove an item from basket
 * @param {object} item 
 */

function removeProductFromBasket(item) {
    const basket = getBasketFromLocalStorage()
    const newCart = basket.filter(itemInLS => itemInLS.productId !== item.productId || itemInLS.color !== item.color);

    saveUpdatedBasketIntoLocalStorage(newCart);
}

/**
 * function to delete the localstorage after validation of the command
 */
function clearLocalStorage() {
    localStorage.clear()
}


/**
 * function to calculate total quantity 
 */

function calculateTotalQuantity() {
    let totalQuantity = 0;
    const basket = getBasketFromLocalStorage()
    basket.forEach(function (product) {
        totalQuantity += parseInt(product.quantity)
    })
    document.getElementById("totalQuantity").textContent = totalQuantity
}

/**
* function to calculate total price and total quantity
*/
function calculateTotalPrice() {
    let totalPrice = 0;
    const basket = getBasketFromLocalStorage()
    if (!basket.length) {
        document.getElementById("totalPrice").textContent = totalPrice
    }
    basket.forEach(function (product) {
        fetch("http://localhost:3000/api/products/" + product.productId)
            .then((response) => response.json())
            .then((data) => {
                totalPrice += data.price * parseInt(product.quantity)
                document.getElementById("totalPrice").textContent = totalPrice
            })

    })

}


/**
 * function to add product in localStorage 
 * @param {{productId : number , color : string , quantity : number}} optionsProduct 
 */
function addProductToBasket(optionsProduct) {
    let productsInLocalStorage = getBasketFromLocalStorage()
    if (productsInLocalStorage) {
        const foundproduct = getProductFromLocalStorageById(productsInLocalStorage, optionsProduct);
        // If the product exists in the localStorage, we retrieve its content, we modify the quantity, then we send it back to the localStorage with the new product added.
        if (foundproduct) {
            let quantity = parseInt(foundproduct.quantity);
            quantity += parseInt(optionsProduct.quantity);
            foundproduct.quantity = quantity
        }
        else {
            productsInLocalStorage.push(optionsProduct)
        }
    }
    // if there's not product in local Storage, create an array and push it //
    else {
        productsInLocalStorage = [];
        productsInLocalStorage.push(optionsProduct);
    }

    saveUpdatedBasketIntoLocalStorage(productsInLocalStorage)
}





