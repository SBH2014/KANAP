
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
    
    }
    else {
        alert("Pour valider votre choix veuillez renseigner une couleur, et une quantité valide entre 1 et 100")
    }

   
})


// functions ------------------- Start -------------------------//
/**
 * function to fill product options 
 * @returns {{productId : string , quantity : number, color : string }}
 */

function fillProductsOptions() {
    return {
        productId: id,
        quantity: parseInt(document.getElementById("quantity").value),
        color: document.getElementById("colors").value
    };

}
/**
 * color and quantity validation conditions
 * @param {{productId : string , quantity : number, color : string}} optionsProduct 
 * @returns  {boolean}
 */

function isSelectedQuantityAndColorValid(optionsProduct) {
    return optionsProduct.quantity && optionsProduct.quantity >= 1 && optionsProduct.quantity <= 100 && optionsProduct.color
}
/**
 * 
 * @param {object} product 
 * @returns {article} html element to create  product 
 */

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
/**
 * function to create img element 
 * @param {object} product 
 * @returns {img} img elemnt 
 */
function createImgElement(product) {
    const imgElement = document.createElement("img");
    imgElement.src = product.imageUrl
    imgElement.alt = product.altTxt
    return imgElement
}
/**
 * function to create  option element 
 * @param {string} color 
 * @returns {option} 
 */
function createOptionElement(color) {
    // option
    const optionElement = document.createElement("option");
    optionElement.value = color
    optionElement.textContent = color
    return optionElement
}

// functions ------------------- End -------------------------//



