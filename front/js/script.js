
// get  products from the API
fetch("http://localhost:3000/api/products")
  .then((response) => response.json())
  //what we have received and which has been processed in json will be called products
  .then((products) => {
    const sectionElement = document.getElementById('items')
    for (let product of products) {
      // create the data for each product ( name, desciption, price,) in the DOM
      sectionElement.insertAdjacentHTML( "beforeend", createHtmlFromProduct(product))
    }
  }
  );
  /**
   * 
   * @param {object} product 
   * @returns {a} html element to create  product cards 
   */
function createHtmlFromProduct(product) {
  return `<a href="./product.html?id=${product._id}">
    <article>
      <img src="${product.imageUrl}" alt="${product.altTxt}">
      <h3 class="productName">${product.name}</h3>
      <p class="productDescription">${product.description}</p>
    </article>
  </a>`
}


