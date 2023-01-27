
fetch("http://localhost:3000/api/products")
    .then((response) => response.json())
    //what we have received and which has been processed in json will be called products
    .then((products) => {
        for (var product of products) {
            document.getElementById("items").appendChild(displayProduct(product));
        }
    }
    );
function displayProduct(product) {
    // a
    const aElement = document.createElement("a");
    // article
    const articleElement = document.createElement("article");

    articleElement.appendChild(imgElement(product));
    articleElement.appendChild(h3Element(product))
    articleElement.appendChild(pElement(product))

    aElement.href = "./product.html?id=" + product._id;
    aElement.appendChild(articleElement)

    return aElement;

}

