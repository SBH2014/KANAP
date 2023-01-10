var url = new URL(window.location.href);
/*This const is to find a query string who contain '?'*/
/*Which is followed by URL parameter In this case the "id" parameter*/
var search_params = new URLSearchParams(url.search);
if (search_params.has('id')) {
    var id = search_params.get('id');
    fetch("http://localhost:3000/api/products/" + id)
        .then(response => response.json())
        .then(product => {
            document.getElementsByClassName("item__img")[0].appendChild(imgElement(product))
            //price
            document.getElementById('price').innerHTML = product.price
            document.getElementById('title').innerHTML = product.name
            //p description 
            document.getElementById('description').innerHTML = product.description

            // la liste déroulante
            const selectElement = document.getElementById('colors')

            // on boucle sur les couleurs du produit
            for (var color of product.colors) {
                selectElement.appendChild(optionElement(color));
            }
        }
        )
    26

}
var button = document.getElementById("addToCart")
// on click, save, add, product selected by ID in local Storage //
button.addEventListener("click", () => {
    // display in local storage all the data  //
    var optionsProduct =
    {
        productId: id,
        quantity: parseInt(document.getElementById("quantity").value),
        color: document.getElementById("colors").value,
        price: document.getElementById("price").innerHTML,
        name: document.getElementById("title").innerHTML,
        img : document.getElementsByClassName("item__img")[0].children[0].src
        
    } 

    // get product options //



    var productsInLocalStorage = JSON.parse(localStorage.getItem("product"))


    // if there's product in local Storage, pusht in json format //
    if (productsInLocalStorage) {
        const foundproduct = productsInLocalStorage.find((product) => {
            console.log(product, optionsProduct)

            return product.productId === optionsProduct.productId && product.color === optionsProduct.color
        })
        if (foundproduct) {
            foundproduct.quantity += optionsProduct.quantity

        }
        else {
            productsInLocalStorage.push(optionsProduct)

        }

        console.log(productsInLocalStorage)

        localStorage.setItem("product", JSON.stringify(productsInLocalStorage))

    }
    // if there's not product in local Storage, create an array and push it //
    else {
        productsInLocalStorage = []
        productsInLocalStorage.push(optionsProduct)
        console.log(productsInLocalStorage)
        localStorage.setItem("product", JSON.stringify(productsInLocalStorage))
    }
 
})

 









