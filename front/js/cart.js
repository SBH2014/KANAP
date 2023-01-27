
// ---------------------------------display products in cart page--------------------------------------------//

//get products from localstorage 
let products = getBasketFromLocalStorage()
// total quantity and price 
let totalQuantity = 0;
let totalPrice = 0;

let cart__items = elementById("cart__items")
//  call of the api product resource
const fetchProductData = (item) => {
  fetch("http://localhost:3000/api/products/" + item.productId)
    .then((response) => response.json())
    .then((data) => {
      calculateTotalPrice(data, item);
      calculateTotalQuantity(item);
      cart__items.innerHTML += makeNewArticle(item, data)
    })
    .catch((e) => console.error(e))
    .finally(() => {
      //  remove product from cart page 
      let deletButton = document.querySelectorAll('.deleteItem');
      deletButton.forEach(item => {
        item.addEventListener('click', event => {
          removeProductFromBasket(item);
        })
      })
      // change quantity in cart page
      document.querySelectorAll('.itemQuantity').forEach(item => {
        item.addEventListener('input', (event) => {
          changeQuantiityInBasket(item)
        })
      })
    })
}
// display product in cart page 
// Function define the conditions for displaying the products in the basket
function displayProducts() {
  if (products && products.length != 0) {
    for (let item of products) {
      fetchProductData(item);
    }
  }
  else {
    document.querySelector("#totalQuantity").innerHTML = "0";
    document.querySelector("#totalPrice").innerHTML = "0";
    document.querySelector("h1").innerHTML =
      "Vous n'avez pas encore d'article dans votre panier !";
  }
}

//
displayProducts();

// create html elements in the DOM 
function makeNewArticle(item, product) {
  return `<article class="cart__item" data-id="${item.productId}" data-color="${item.color}">
  <div class="cart__item__img">
    <img src="${product.imageUrl}" alt="Photographie d'un canapé">
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

function calculateTotalQuantity(item) {
  totalQuantity += parseInt(item.quantity);
  elementById("totalQuantity").innerHTML = totalQuantity
}

function calculateTotalPrice(data, item) {
  // obliger de le faire ici parce que le calcul se fait dans une fonction asynchrone.
  totalPrice += (parseInt(data.price) * parseInt(item.quantity))
  elementById("totalPrice").innerHTML = totalPrice
}

// function to delet products from basket 
function removeProductFromBasket(item) {
  let dataId = getDataIdOfArticle(item);
  let dataColor = getDataColorOfArticle(item);
  if (dataId && dataColor) {
    const newCart = products.filter(item => item.productId !== dataId || item.color !== dataColor);
    saveUpdatedBasketIntoLocalStorage(newCart);
    location.reload();
  }
}

//listen to the change in quantity
function changeQuantiityInBasket(item) {
  let dataId = getDataIdOfArticle(item);
  let dataColor = getDataColorOfArticle(item);
  for (let product of products) {
    if (dataId === product.productId && dataColor === product.color) {
      product.quantity = event.target.value
      if (product.quantity > 100) {
        product.quantity = 100;
        location.reload()
      }
      if (product.quantity == 0) {
        product.quantity = 1;
        location.reload()
      }

    }
  }

  saveUpdatedBasketIntoLocalStorage(products)
  totalQuantity = 0;
  totalPrice = 0;
  for (let item of products) {
    forceUpdateQuantityAndTotalPrice(item);
  }
}
function forceUpdateQuantityAndTotalPrice(item) {
  fetch("http://localhost:3000/api/products/" + item.productId)
    .then((response) => response.json())
    .then((data) => {
      calculateTotalPrice(data, item);
      calculateTotalQuantity(item);
    });
}

function getDataColorOfArticle(item) {
  return item.closest('article').getAttribute("data-color");
}

function getDataIdOfArticle(item) {
  return item.closest('article').getAttribute("data-id");
}

// --------------------------------- end display products in cart page--------------------------------------------//


//------------------------------------ validation of the basket page and get confirmation page ----------------------------------------------------//
let buttonOrder = elementById("order")
buttonOrder.addEventListener("click", function (e) {
  // prevent the page from reloading
  e.preventDefault();
  validationOfFORM();
  sendProductIdAndContact();
  clearLocalStorage();
})


//---------------------------------------case-by-case treatment-------------------------------------//
// get the form 
let formElement = document.querySelector('form');
// listen to firstname change 
formElement.firstName.addEventListener("input", function () {
  valideFirstName(this.value)
});
// listen to lastname change
formElement.lastName.addEventListener("input", function () {
  valideLastName(this.value)
});
//listen to the modification of the city
formElement.city.addEventListener("input", function () {

  valideCity(this.value)

});
// listen to the modification of the address 
formElement.address.addEventListener("input", function () {
  valideAddress(this.value)
});
// listen to the modification of the email
formElement.email.addEventListener("input", function () {
  valideEmail(this.value)
})
//-----------------case-by-case validation functions --------------------------//
function validationOfFORM() {
  if (valideFirstName(firstName.value) && valideLastName(lastName.value) && valideCity(city.value) && valideAddress(address.value) && valideEmail(email.value)) {
    {
      let formValues = getFormeValues()
      localStorage.setItem("formValues", JSON.stringify(formValues))
    }
  }
  else {
    alert('veuillez bien remplir les champs !')
  }
}
//function of email validation 
const valideEmail = function (inputEmail) {
  if (regExEmail(inputEmail)) {
    elementById("emailErrorMsg").innerHTML = ''
    return true
  }
  else {
    elementById("emailErrorMsg").innerHTML = 'Merci de saisir un email valide'
    return false
  }
};
//function of address validation 
const valideAddress = function (inputAddress) {
  if (regExaddress(inputAddress)) {
    elementById("addressErrorMsg").innerHTML = ''
    return true
  }
  else {
    elementById("addressErrorMsg").innerHTML = 'Merci de saisir une adresse valide'
    return false
  }
};
//function of city validation 
const valideCity = function (inputCity) {
  if (regExPrenomNomVille(inputCity)) {
    elementById("cityErrorMsg").innerHTML = ''
    return true
  }
  else {
    elementById("cityErrorMsg").innerHTML = 'Merci de saisir une ville valide'
    return false
  }
};
//function of firstName validation 
const valideFirstName = function (inputFirstName) {
  if (regExPrenomNomVille(inputFirstName)) {
    elementById("firstNameErrorMsg").innerHTML = ''
    return true
  }
  else {
    elementById("firstNameErrorMsg").innerHTML = 'Merci de saisir un prénom valide'
    return false
  }
};
//function of lastName validation 
const valideLastName = function (inputLastName) {
  if (regExPrenomNomVille(inputLastName)) {
    elementById("lastNameErrorMsg").innerHTML = ''
    return true
  }
  else {
    elementById("lastNameErrorMsg").innerHTML = 'Merci de saisir un nom valide'
    return false
  }
}
//------------------------------ RegEx Function--------------------------------//
// regEx of the email
let regExEmail = (value) => {
  return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value))
}
// regEx of the Firstname lastname and city
let regExPrenomNomVille = (value) => {
  return /^[A-Za-z]{3,20}$/.test(value)
}
// regEx of the address 
let regExaddress = (value) => {
  return /^[a-zA-Z0-9À-ÿ\s,.'-]{3,}$/.test(value)
}
//------------------------------------End RegEx function-----------------------------//

//function on posting validation to server

function sendProductIdAndContact() {
  let formValues = getFormeValues()
  // put the values ​​of the forms and the selected products in an object sent to the servers
  const productsAndFormtoSend = {
    products: products.map(aProduct => aProduct.productId),
    contact: formValues
  }
  //send object "productsAndFormtoSend" to the server 


  const rawResponse = fetch('http://localhost:3000/api/products/order', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(productsAndFormtoSend)
  }).then((response) => response.json())
    .then((data) => window.location.replace(`/front/html/confirmation.html?commande=${data.orderId}`))
}
  



//the customer's data will be stored in this table for the order on the basket page
// get datalocalstorage 
let datalocalstorageForm = localStorage.getItem("formValues")
// convert to object js
let datalocalstorageFormObject = JSON.parse(datalocalstorageForm)
// function to fill form from localstorage
function fillInTheFormFromLocalStorage(input) {
  document.querySelector(`#${input}`).value = datalocalstorageFormObject[input];
}
fillInTheFormFromLocalStorage("firstName")
fillInTheFormFromLocalStorage("lastName")
fillInTheFormFromLocalStorage("address")
fillInTheFormFromLocalStorage("city")
fillInTheFormFromLocalStorage("email");
//function to get form values
function getFormeValues() {
  return {
    firstName: document.querySelector("#firstName").value,
    lastName: document.querySelector("#lastName").value,
    address: document.querySelector("#address").value,
    city: document.querySelector("#city").value,
    email: document.querySelector("#email").value,
  };
}
