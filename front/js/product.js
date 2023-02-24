

//retrieves the URL of the current page
let url = new URL(window.location.href);
//This const is to find a query string who contain '?' Which is followed by URL parameter In this case the "id" parameter
let search_params = new URLSearchParams(url.search);

// check if the parameter exists in the URL
if (search_params.has('id')) {
    var id = search_params.get('id');
    // We only retrieve the product we need via the parameter in the request
    fetch("http://localhost:3000/api/products/" + id)
        .then(response => response.json())
        .then((product) => createProductToHtml(product))
}

// on click, save, add, product selected by ID in local Storage //
let button = document.getElementById("addToCart")
button.addEventListener("click", () => {
    const optionsProduct = fillProductsOptions()

    if (isSelectedQuantityAndColorValid(optionsProduct)) {
        addProductToBasket(optionsProduct);
        document.querySelector("#addToCart").style.color = "rgb(0, 200, 0)";
        document.querySelector("#addToCart").textContent = "Produit ajouté !";
    }
    else {

        document.querySelector("#addToCart").style.color = "rgb(255, 0, 0)";
        alert("Pour valider votre choix veuillez renseigner une couleur, et une quantité valide entre 1 et 100")
    }
})


// functions ------------------- Start -------------------------//
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
function fillProductsOptions() {
    return {
        productId: id,
        quantity: parseInt(document.getElementById("quantity").value),
        color: document.getElementById("colors").value
    };

}

function isSelectedQuantityAndColorValid(optionsProduct) {
    return optionsProduct.quantity && optionsProduct.quantity >= 1 && optionsProduct.quantity <= 100 && optionsProduct.color
}

function createProductToHtml(product) {
    document.querySelector(".item__img").appendChild(createImgElement(product))
    let priceSpan = document.getElementById('price')
    priceSpan.textContent = product.price
    let titleElement = document.getElementById('title')
    titleElement.textContent = product.name
    let descriptionElement = document.getElementById('description')
    descriptionElement.textContent = product.description
    const selectElement = document.getElementById('colors')
    for (let color of product.colors) {
        selectElement.appendChild(createOptionElement(color));
    }
}
function createImgElement(product) {
    const imgElement = document.createElement("img");
    imgElement.src = product.imageUrl
    imgElement.alt = product.altTxt
    return imgElement
}
function createOptionElement(color) {
    // option
    const optionElement = document.createElement("option");
    optionElement.value = color
    optionElement.textContent = color
    return optionElement
}

// functions ------------------- End -------------------------//



