
// ---------------------------------display products in cart page--------------------------------------------//
//get products from localstorage
let products = getBasket()
let cart__items = document.getElementById("cart__items")
displayProducts();

//functions -----------------------------------------------start----------------------------------------------------------//

//  call of the api product resource
function fetchProductData(item) {
  fetch("http://localhost:3000/api/products/" + item.productId)
    .then((response) => response.json())
    .then((data) => {
      let htmlArticle = makeNewArticle(item, data)
      cart__items.insertAdjacentHTML('beforeend', htmlArticle);
      document.querySelector(`[data-id="${item.productId}"][data-color="${item.color}"] .deleteItem`).addEventListener('click', event => {
        document.querySelector(`[data-id="${item.productId}"][data-color="${item.color}"]`).remove();
        removeProductToBasket(item);
        updateCart();

      })
      document.querySelector(`[data-id="${item.productId}"][data-color="${item.color}"] .itemQuantity`).addEventListener('input', event => {
        const value = event.target.value;
        updateBasketQuantity(item, value);
        updateCart();

      })
      updateCart()

    })
    .catch((e) => console.error(e))

}
/**
 * function to update total price and total quantity
 */
function updateCart() {
  calculateBasketTotalPrice()
  calculateBasketTotalQuantity()
}

/**
 * Function define the conditions for displaying the products in the basket
 */
function displayProducts() {
  if (products && products.length !== 0) {
    for (let item of products) {
      fetchProductData(item);
    }
  }
  else {
    document.querySelector("#totalQuantity").insertAdjacentHTML("afterbegin", "0");
    document.querySelector("#totalPrice").insertAdjacentHTML("afterbegin", "0");
    let h1 = document.querySelector("h1")
    let newH1 = document.createElement('h1')
    let divElement = document.getElementById('cartAndFormContainer')
    newH1.textContent = "Vous n'avez pas encore d'article dans votre panier !"
    divElement.replaceChild(newH1, h1)
  }
}

/**
 * Create article HTML
 */
function makeNewArticle(item, product) {
  return `<article class="cart__item" data-id="${item.productId}" data-color="${item.color}">
  <div class="cart__item__img">
    <img src="${product.imageUrl}" alt="${product.altTxt}">
  </div>
  <div class="cart__item__content">
    <div class="cart__item__content__description">
      <h2>${product.name}</h2>
      <p>${item.color}</p>
      <p>${product.price} €</p>
    </div>
    <div class="cart__item__content__settings">
      <div class="cart__item__content__settings__quantity">
        <p>Qté : </p>
        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${item.quantity}">
      </div>
      <div class="cart__item__content__settings__delete">
        <p class="deleteItem">Supprimer</p>
      </div>
    </div>
  </div>
</article>`
}




// functions -----------------------------------End----------------------------------------------------------------//
// --------------------------------- end display products in cart page--------------------------------------------//

//-------------------------------------------Validation of the Form----------------------------------------------//

//------------------------------ --------------RegEx Function---------------------------------------------------//
// regEx of the email
let regExEmail = (value) => {
  return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value))
}
// regEx of the Firstname lastname and city
let regExAlphaNum = (value) => {
  return /^[A-Za-z]{3,20}$/.test(value)
}
// regEx of the address
let regExAddress = (value) => {
  return /^[a-zA-Z0-9À-ÿ\s,.'-]{3,}$/.test(value)
}
//------------------------------------End RegEx function---------------------------------------------//

//-------------------------------------- Global Validation Form-------------------------------------//

/**
 * function to validate form fields
 */
function handleFormSubmit() {
  const{firstName, lastName, city, address, email } = getFormeValues()
  return handleFirstName(firstName) && handleLastName(lastName) && handleCity(city) && handleAddress(address) && handleEmail(email)
}

//------------------------------------ validation of the basket page and get confirmation page ----------------------------------------------------//
let buttonOrder = document.getElementById("order")
buttonOrder.addEventListener("click", function (e) {
  // prevent the page from reloading
  e.preventDefault();
  if (handleFormSubmit()) {
    sendProductIdAndContact();
    clearLocalStorage();
  }
  else {
    alert('veuillez remplir le formulaire')
  }

})


/**
 * function to send the validation to the server
 */
function sendProductIdAndContact() {
  let formValues = getFormeValues()
  // put the values of the forms and the selected products in an object sent to the servers
  const basket = getBasket()
  // todo Attention le panier peut être vide ici
  const data = {
    products: basket.map(product => product.productId),
    contact: formValues
  }
  //send object "data" to the server
   fetch('http://localhost:3000/api/products/order', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then((response) => response.json())
    .then((data) =>window.location.href  = `./confirmation.html?commande=${data.orderId}`)
}
//---------------------------------------case-by-case treatment-------------------------------------//
// get the form
let formElement = document.querySelector('form');
formElement.firstName.addEventListener("input", function () {
  handleFirstName(this.value)
});
formElement.lastName.addEventListener("input", function () {
  handleLastName(this.value)
});
formElement.city.addEventListener("input", function () {
  handleCity(this.value)
});
formElement.address.addEventListener("input", function () {
  handleAddress(this.value)
});
// listen to the modification of the email
formElement.email.addEventListener("input", function () {
  handleEmail(this.value)
})
//-----------------case-by-case validation functions --------------------------//
/**
 * function of email validation
 * @param {string } inputEmail
 * @returns {boolean}
 */
const handleEmail = function (inputEmail) {
  if (regExEmail(inputEmail)) {
    document.getElementById("emailErrorMsg").textContent = ''
    return true
  }
  else {
    document.getElementById("emailErrorMsg").textContent = 'Merci de saisir un email valide'
    return false
  }
};

/**
 * function of address validation
 * @param {string} inputAddress
 * @returns {boolean}
 */
const handleAddress = function (inputAddress) {
  if (regExAddress(inputAddress)) {
    document.getElementById("addressErrorMsg").textContent = ''
    return true
  }
  else {
    document.getElementById("addressErrorMsg").textContent = 'Merci de saisir une adresse valide'
    return false
  }
};

/**
 * function of city validation
 * @param {string} inputCity
 * @returns {boolean}
 */
const handleCity = function (inputCity) {
  if (regExAlphaNum(inputCity)) {
    document.getElementById("cityErrorMsg").textContent = ''
    return true
  }
  else {
    document.getElementById("cityErrorMsg").textContent = 'Merci de saisir une ville valide'
    return false
  }
};

/**
 * function of firstName validation
 * @param {string} inputFirstName
 * @returns  {boolean}
 */
const handleFirstName = function (inputFirstName) {
  if (regExAlphaNum(inputFirstName)) {
    document.getElementById("firstNameErrorMsg").textContent = ''
    return true
  }
  else {
    document.getElementById("firstNameErrorMsg").textContent = 'Merci de saisir un prénom valide'
    return false
  }
};
/**
 * function of lastName validation
 * @param {string} inputLastName
 * @returns {boolean}
 */

const handleLastName = function (inputLastName) {
  if (regExAlphaNum(inputLastName)) {
    document.getElementById("lastNameErrorMsg").textContent = ''
    return true
  }
  else {
    document.getElementById("lastNameErrorMsg").textContent = 'Merci de saisir un nom valide'
    return false
  }
}

/**
 * function to get form values firstName , lastName, address, city, email
 * @returns {object}
 */

function getFormeValues() {
  return {
    firstName: document.querySelector("#firstName").value,
    lastName: document.querySelector("#lastName").value,
    address: document.querySelector("#address").value,
    city: document.querySelector("#city").value,
    email: document.querySelector("#email").value,
  };
}


