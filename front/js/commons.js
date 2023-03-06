/**
 * Save product in localStorage
 */
function saveBasket(basket) {
    localStorage.setItem("product", JSON.stringify(basket))
}

/**
 * Get basket from localStorage
 */
function getBasket() {
    return JSON.parse(localStorage.getItem("product"))
}

/**
 * Update quantity
 */
function updateBasketQuantity(item, value) {
    const basket = getBasket()
    const findProduct = basket.find(product => item.productId === product.productId && item.color === product.color);
    if (findProduct) {
        findProduct.quantity = value > 100 ? 100 : value < 1 ? 1 : value;

    }

    saveBasket(basket);
}

/**
 * function to dynamically remove an item from basket
 * @param {object} item
 */

function removeProductToBasket(item) {
    const basket = getBasket()
    const newCart = basket.filter(itemInLS => itemInLS.productId !== item.productId || itemInLS.color !== item.color);

    saveBasket(newCart);
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

function calculateBasketTotalQuantity() {
    let totalQuantity = 0;
    const basket = getBasket()
    basket.forEach(function (product) {
        totalQuantity += parseInt(product.quantity)
    })
    document.getElementById("totalQuantity").textContent = totalQuantity
}

/**
 * function to calculate total price and total quantity
 */
function calculateBasketTotalPrice() {
    let totalPrice = 0;
    const basket = getBasket()
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
 */
function addProductToBasket(product) {
    const basket = getBasket() || [];
    if (basket.length) {
        const foundProduct = basket.find((p) => {
            return p.productId === product.productId && p.color === product.color;
        });
        // If the product exists in the localStorage, we retrieve its content, we modify the quantity, then we send it back to the localStorage with the new product added.
        if (foundProduct) {
            let quantity = parseInt(foundProduct.quantity);
            quantity += parseInt(product.quantity);
            foundProduct.quantity = quantity
        } else {
            basket.push(product)
        }
    }
    // if there's not product in local Storage, create an array and push it //
    else {
        basket.push(product);
    }
    saveBasket(basket)
}





