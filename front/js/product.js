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

}



