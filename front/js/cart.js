
// ---------------------------------display products in cart page--------------------------------------------//
//get products from localstorage 
let products = getBasketFromLocalStorage()
let cart__items = document.getElementById("cart__items")
//  call of the api product resource
const fetchProductData = (item) => {
  fetch("http://localhost:3000/api/products/" + item.productId)
    .then((response) => response.json())
    .then((data) => {
      let htmlArticle = makeNewArticle(item, data)
      cart__items.insertAdjacentHTML('beforeend', htmlArticle);

      console.log("{item.productId")

      document.querySelector(`[data-id="${item.productId}"][data-color="${item.color}"] .deleteItem`).addEventListener('click', event => {
        document.querySelector(`[data-id="${item.productId}"][data-color="${item.color}"]`).remove();
        removeProductFromBasket(item);
        updatCart();
        location.reload();

      })

      document.querySelector(`[data-id="${item.productId}"][data-color="${item.color}"] .itemQuantity`).addEventListener('input', event => {
        const value = event.target.value;
        changeQuantityInBasket(item, value);
        updatCart();

      })
      updatCart()

    })

    .catch((e) => console.error(e))

}
//  remove product from cart page 
/*
let deletButton = document.querySelectorAll('.deleteItem');
deletButton.forEach(item => {
  item.addEventListener('click', event => {
    removeProductFromBasket(item);
  
  })
 
})

// change quantity in cart page
/*
document.querySelectorAll('.itemQuantity').forEach(item => {
item.addEventListener('input', event => {
const value = event.target.value;
changeQuantityInBasket(item,value)
console.log("hello")
updatCart()
})

})
*/

function updatCart() {
  calculateTotalPrice()
  calculateTotalQuantity()

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
    document.querySelector("#totalQuantity").insertAdjacentHTML("afterbegin", "0");
    document.querySelector("#totalPrice").insertAdjacentHTML("afterbegin", "0");
    let h1 = document.querySelector("h1")
    let newH1 = document.createElement('h1')
    let divElement = document.getElementById('cartAndFormContainer')
    newH1.textContent = "Vous n'avez pas encore d'article dans votre panier !"
    divElement.replaceChild(newH1, h1)
  }
}

//
displayProducts();

// attention innerHtml -----------------------------§§§§§§§...../// 
// faire la meme chose ans le script 
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

function calculateTotalQuantity() {
  let totalQuantity = 0;
  products.forEach(function (product) {
    totalQuantity += parseInt(product.quantity)
  })
  document.getElementById("totalQuantity").textContent = totalQuantity
}

function calculateTotalPrice() {
  // obliger de le faire ici parce que le calcul se fait dans une fonction asynchrone.
  let totalPrice = 0;
  products.forEach(function (product) {
    fetch("http://localhost:3000/api/products/" + product.productId)
      .then((response) => response.json())
      .then((data) => {
        totalPrice += data.price * parseInt(product.quantity)
        document.getElementById("totalPrice").textContent = totalPrice
      })

  })

}


// function to delet products from basket 
function removeProductFromBasket(item) {
  const newCart = products.filter(itemInLS => itemInLS.productId !== item.productId || itemInLS.color !== item.color);
  saveUpdatedBasketIntoLocalStorage(newCart);
}
function changeQuantityInBasket(item, value) {
  const findProduct = products.find(product => item.productId === product.productId && item.color === product.color);
  if (findProduct) {
    findProduct.quantity = value > 100 ? 100 : value < 1 ? 1 : value;
  }
  saveUpdatedBasketIntoLocalStorage(products);
}
//listen to the change in quantity

function getDataColorOfArticle(item) {
  return item.closest('article').getAttribute("data-color");
}

function getDataIdOfArticle(item) {
  return item.closest('article').getAttribute("data-id");
}

// --------------------------------- end display products in cart page--------------------------------------------//



//--------------------------------Validation of the Form----------------------------------------//

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
//------------------------------------End RegEx function---------------------------------------------//

//-------------------------------------- Global Validation Form-------------------------------------//
function isFormvalid() {
  return isFirstNameValide(firstName.value) && isLastNameValide(lastName.value) && isCityValide(city.value) && isAddressValide(address.value) && isEmailValide(email.value)
}

//------------------------------------ validation of the basket page and get confirmation page ----------------------------------------------------//
let buttonOrder = document.getElementById("order")
buttonOrder.addEventListener("click", function (e) {
  // prevent the page from reloading
  e.preventDefault();
  if (isFormvalid()) {
    sendProductIdAndContact();
    clearLocalStorage();
  }
  else {
    alert('veuillez remplir le formulaire')
  }

})
// delete the localstorage after validation of the command
function clearLocalStorage() {
  localStorage.clear()
}
//---------------------------------------case-by-case treatment-------------------------------------//
// get the form 
let formElement = document.querySelector('form');
// listen to firstname change 
formElement.firstName.addEventListener("input", function () {
  isFirstNameValide(this.value)
});
// listen to lastname change
formElement.lastName.addEventListener("input", function () {
  isLastNameValide(this.value)
});
//listen to the modification of the city
formElement.city.addEventListener("input", function () {

  isCityValide(this.value)

});
// listen to the modification of the address 
formElement.address.addEventListener("input", function () {
  isAddressValide(this.value)
});
// listen to the modification of the email
formElement.email.addEventListener("input", function () {
  isEmailValide(this.value)
})
//-----------------case-by-case validation functions --------------------------//

//function of email validation 
const isEmailValide = function (inputEmail) {
  if (regExEmail(inputEmail)) {
    document.getElementById("emailErrorMsg").textContent = ''
    let errorElement = document.querySelector('#emailErrorMsg')
    return true
  }
  else {
    document.getElementById("emailErrorMsg").textContent = 'Merci de saisir un email valide'
    return false
  }
};
//function of address validation 
const isAddressValide = function (inputAddress) {
  if (regExaddress(inputAddress)) {
    document.getElementById("addressErrorMsg").textContent = ''
    return true
  }
  else {
    document.getElementById("addressErrorMsg").textContent = 'Merci de saisir une adresse valide'
    return false
  }
};
//function of city validation 
const isCityValide = function (inputCity) {
  if (regExPrenomNomVille(inputCity)) {
    document.getElementById("cityErrorMsg").textContent = ''
    return true
  }
  else {
    document.getElementById("cityErrorMsg").textContent = 'Merci de saisir une ville valide'
    return false
  }
};
//function of firstName validation 
const isFirstNameValide = function (inputFirstName) {
  if (regExPrenomNomVille(inputFirstName)) {
    document.getElementById("firstNameErrorMsg").textContent = ''

    return true
  }
  else {
    document.getElementById("firstNameErrorMsg").textContent = 'Merci de saisir un prénom valide'
    return false
  }
};
//function of lastName validation 
const isLastNameValide = function (inputLastName) {
  if (regExPrenomNomVille(inputLastName)) {
    document.getElementById("lastNameErrorMsg").textContent = ''
    return true
  }
  else {
    document.getElementById("lastNameErrorMsg").textContent = 'Merci de saisir un nom valide'
    return false
  }
}


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

