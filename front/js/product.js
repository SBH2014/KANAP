//This const is to find a query string who contain '?'
//Which is followed by URL parameter In this case the "id" parameter
let url = new URL(window.location.href);
let search_params = new URLSearchParams(url.search);

if (search_params.has('id')) {
    var id = search_params.get('id');
    fetch("http://localhost:3000/api/products/" + id)
        .then(response => response.json())
        .then((product) => handleData(product))
}

// on click, save, add, product selected by ID in local Storage //
let button = elementById("addToCart")
button.addEventListener("click", () => {
    var optionsProduct = fillProductsOptions()
    if (checkSelectedQuantityAndColor()) {
        document.querySelector("#addToCart").style.color = "rgb(255, 0, 0)";
        alert("Pour valider votre choix veuillez renseigner une couleur, et une quantité valide entre 1 et 100")
    }
    else {
        let productsInLocalStorage = getBasketFromLocalStorage()
        updateQuantityInLocalStorage(productsInLocalStorage, optionsProduct);
        document.querySelector("#addToCart").style.color = "rgb(0, 200, 0)";
        document.querySelector("#addToCart").textContent = "Produit ajouté !";
    }
})

// functions ------------------- Start -------------------------//
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
    saveUpdatedBasketIntoLocalStorage(productsInLocalStorage)
}

function fillProductsOptions() {
    return {
        productId: id,
        quantity: parseInt(elementById("quantity").value),
        color: elementById("colors").value
    };
}

function checkSelectedQuantityAndColor() {
    let optionsProduct = fillProductsOptions()
    return isNaN(optionsProduct.quantity) ||
        optionsProduct.quantity === undefined ||
        optionsProduct.quantity < 1 ||
        optionsProduct.quantity > 100 ||
        optionsProduct.color === "" ||
        optionsProduct.color === undefined;
}

function handleData(product) {
    document.getElementsByClassName("item__img")[0].appendChild(imgElement(product))
    elementById('price').innerHTML = product.price
    elementById('title').innerHTML = product.name
    elementById('description').innerHTML = product.description
    const selectElement = elementById('colors')
    for (var color of product.colors) {
        selectElement.appendChild(optionElement(color));
    }
}

// functions ------------------- End -------------------------//



