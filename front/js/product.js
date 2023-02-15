
//This const is to find a query string who contain '?'
//Which is followed by URL parameter In this case the "id" parameter
let url = new URL(window.location.href);
let search_params = new URLSearchParams(url.search);

if (search_params.has('id')) {
    var id = search_params.get('id');

    fetch("http://localhost:3000/api/products/" + id)
        .then(response => response.json())
        .then((product) => createProductToHtml(product))
}

// on click, save, add, product selected by ID in local Storage //
let button = document.getElementById("addToCart")
button.addEventListener("click", () => {
    const optionsProduct = fillProductsOptions()

    if (isSelectedQuantityAndColorValid()) {
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
        if(foundproduct) {
            let quantity = parseInt(foundproduct.quantity);
            quantity += parseInt(optionsProduct.quantity);
            foundproduct.quantity = quantity
        } else {
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

function isSelectedQuantityAndColorValid() {
    let optionsProduct = fillProductsOptions()
    return optionsProduct.quantity && optionsProduct.quantity >= 1 && optionsProduct.quantity <= 100 && optionsProduct.color

}

function createProductToHtml(product) {
    document.getElementsByClassName("item__img")[0].appendChild(imgElement(product))
    let pElement = document.querySelector('.item__content__titlePrice p')
    let priceSpan = document.getElementById('price')
    priceSpan.textContent = product.price


    let htmlTitle = product.name
    let titleElement = document.getElementById('title')
    titleElement.insertAdjacentHTML("afterbegin", htmlTitle);

    let htmlDescription = product.description
    let descriptionElement = document.getElementById('description')
    descriptionElement.insertAdjacentHTML("beforeend", htmlDescription);
    const selectElement = document.getElementById('colors')
    for (let color of product.colors) {
        selectElement.appendChild(optionElement(color));
    }
}
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
    optionElement.textContent = color
    return optionElement
}

// functions ------------------- End -------------------------//



