
// get  products from the API
fetch("http://localhost:3000/api/products")
  .then((response) => response.json())
  //what we have received and which has been processed in json will be called products
  .then((products) => {
    for (let product of products) {
      let aElement = document.createElement('a')
      // create the data for each product ( name,desciptionprice,) in the DOM
      aElement.innerHTML += displayProduct(product)
      let sectionElement = document.getElementById('items')
      sectionElement.appendChild(aElement)
    }
  }
  );
function displayProduct(product) {
  return `<a href="./product.html?id=${product._id}">
    <article>
      <img src="${product.imageUrl}" alt="${product.altTxt}">
      <h3 class="productName">${product.name}</h3>
      <p class="productDescription">${product.description}</p>
    </article>
  </a>`
}


