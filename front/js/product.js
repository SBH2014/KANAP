//This const is to find a query string who contain '?'
//Which is followed by URL parameter In this case the "id" parameter
const url = new URL(window.location.href);
const search_params = new URLSearchParams(url.search);

if (search_params.has('id')) {
    var id = search_params.get('id');
    fetch("http://localhost:3000/api/products/" + id)
        .then(response => response.json())
        .then((product) => handleData(product))
}

// on click, save, add, product selected by ID in local Storage //
var button = elementById("addToCart")
button.addEventListener("click", () => {
    // get product options //
    var optionsProduct = fillProductsOptions()

    var productsInLocalStorage = getBasketFromLocalStorage()

    // if there's product in local Storage, pusht in json format //
    updateQuantityInLocalStorage(productsInLocalStorage, optionsProduct);
})


// functions ------------------- Start -------------------------
function updateQuantityInLocalStorage(productsInLocalStorage, optionsProduct) {
    if (productsInLocalStorage) {
        const foundproduct = getProductFromLocalStorageById(productsInLocalStorage, optionsProduct);
        foundproduct ? foundproduct.quantity += optionsProduct.quantity : productsInLocalStorage.push(optionsProduct)
    }
    // if there's not product in local Storage, create an array and push it //
    else {
        productsInLocalStorage = [];
        productsInLocalStorage.push(optionsProduct);
    }
    console.log('productsInLocalStorage', productsInLocalStorage)
    saveUpdatedBasketIntoLocalStorage(productsInLocalStorage)
}

function fillProductsOptions() {
    return {
        productId: id,
        quantity: parseInt(elementById("quantity").value),
        color: elementById("colors").value
    };
}

function handleData(product) {
    document.getElementsByClassName("item__img")[0].appendChild(imgElement(product))
    //price
    elementById('price').innerHTML = product.price
    elementById('title').innerHTML = product.name
    //p description 
    elementById('description').innerHTML = product.description

    // la liste déroulante
    const selectElement = elementById('colors')
    // on boucle sur les couleurs du produit
    for (var color of product.colors) {
        selectElement.appendChild(optionElement(color));
    }
    
}
// functions ------------------- End -------------------------



